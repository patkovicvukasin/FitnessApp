import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../../config/stripe';
import { getAllTrainingTypes } from '../../../services/trainingTypeService';
import { createPaymentIntent, confirmPayment } from '../../../services/paymentService';
import StripeCheckoutForm from '../../../components/payment/StripeCheckoutForm';
import type { TrainingType } from '../../../types/TrainingType';

export default function BuyTrainingPage() {
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [clientSecret, setClientSecret] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainingTypes = async () => {
      try {
        const data = await getAllTrainingTypes();
        setTrainingTypes(data);
        if (data.length > 0) {
          setSelectedTypeId(data[0].id);
        }
      } catch (err) {
        setError('Greška pri učitavanju tipova treninga');
      }
    };

    fetchTrainingTypes();
  }, []);

  const selectedType = trainingTypes.find(t => t.id === selectedTypeId);
  const totalPrice = selectedType ? selectedType.price * quantity : 0;

  const handleProceedToPayment = async () => {
    if (!selectedType) return;

    setError('');
    setLoading(true);

    try {
      const paymentIntent = await createPaymentIntent({
        trainingTypeId: selectedTypeId,
        quantity,
      });

      setClientSecret(paymentIntent.clientSecret);
      setAmount(paymentIntent.amount);
      setShowCheckout(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Greška pri kreiranju plaćanja');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    setLoading(true);
    setError('');

    try {
      await confirmPayment({
        paymentIntentId,
        trainingTypeId: selectedTypeId,
        quantity,
      });

      alert('Kupovina uspešna!');
      navigate('/member/purchases');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Greška pri potvrđivanju plaćanja');
      setShowCheckout(false);
      setLoading(false);
    }
  };

  const handleCancelPayment = () => {
    setShowCheckout(false);
    setClientSecret('');
  };

  if (showCheckout && clientSecret) {
    return (
      <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripeCheckoutForm
            clientSecret={clientSecret}
            amount={amount}
            onSuccess={handlePaymentSuccess}
            onCancel={handleCancelPayment}
          />
        </Elements>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        marginBottom: '40px',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '20px'
      }}>
        <h1 style={{ margin: '0 0 10px 0' }}>Kupi trening</h1>
        <p style={{ margin: 0, color: '#666' }}>Izaberite tip treninga i količinu</p>
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

      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Tip treninga
          </label>
          <select
            value={selectedTypeId}
            onChange={(e) => setSelectedTypeId(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            {trainingTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name} - {type.price}€
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Količina
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{
          backgroundColor: '#e3f2fd',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '30px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>Pregled kupovine</h3>
          {selectedType && (
            <>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Trening: {selectedType.name}
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Cena po treningu: {selectedType.price}€
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Količina: {quantity}
              </p>
              <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #ccc' }} />
              <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>
                Ukupno: {totalPrice.toFixed(2)}€
              </p>
            </>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleProceedToPayment}
            disabled={loading || trainingTypes.length === 0}
            style={{
              padding: '12px 24px',
              backgroundColor: loading ? '#ccc' : '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            {loading ? 'Obrađivanje...' : 'Nastavi na plaćanje'}
          </button>
          <button
            onClick={() => navigate('/member/purchases')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Otkaži
          </button>
        </div>
      </div>
    </div>
  );
}