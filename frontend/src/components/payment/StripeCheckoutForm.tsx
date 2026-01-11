import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface StripeCheckoutFormProps {
  clientSecret: string;
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onCancel: () => void;
}

export default function StripeCheckoutForm({ 
  clientSecret, 
  amount, 
  onSuccess, 
  onCancel 
}: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError('');

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('Card element not found');
      setProcessing(false);
      return;
    }

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || 'Greška pri procesiranju plaćanja');
        setProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      } else {
        setError('Plaćanje nije uspelo');
        setProcessing(false);
      }
    } catch (err: any) {
      setError('Greška pri procesiranju plaćanja');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: '0 0 20px 0', color: '#1976d2' }}>Plaćanje</h2>
      
      <div style={{
        backgroundColor: '#e3f2fd',
        padding: '15px',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#1976d2' }}>
          Iznos: {(amount / 100).toFixed(2)}€
        </p>
      </div>

      <div style={{
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>

      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          type="submit"
          disabled={!stripe || processing}
          style={{
            padding: '12px 24px',
            backgroundColor: processing ? '#ccc' : '#2e7d32',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: processing ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            flex: 1
          }}
        >
          {processing ? 'Procesiranje...' : 'Plati'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={processing}
          style={{
            padding: '12px 24px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: processing ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          Otkaži
        </button>
      </div>
    </form>
  );
}