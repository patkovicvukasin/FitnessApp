import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyPurchases } from '../../../services/purchaseService';
import type { Purchase } from '../../../types/Purchase';

export default function MemberPurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const data = await getMyPurchases();
        setPurchases(data);
        setError('');
      } catch (err) {
        setError('Greška pri učitavanju kupovina');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('sr-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Učitavanje...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ margin: '0 0 10px 0' }}>Moje kupovine</h1>
          <p style={{ margin: 0, color: '#666' }}>Pregled svih kupovina i preostalih kredita</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/member/purchases/buy')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Kupi trening
          </button>
          <button
            onClick={() => navigate('/member')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Nazad
          </button>
        </div>
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

      <div style={{ display: 'grid', gap: '20px' }}>
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>
                {purchase.trainingTypeName}
              </h3>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Količina: {purchase.quantity} x {purchase.trainingTypePrice}€ = {purchase.totalPrice}€
              </p>
              <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                Kupljeno: {formatDate(purchase.purchasedAt)}
              </p>
            </div>
            <div style={{
              padding: '20px',
              backgroundColor: purchase.remaining > 0 ? '#e8f5e9' : '#ffebee',
              borderRadius: '8px',
              textAlign: 'center',
              minWidth: '150px'
            }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                Preostalo:
              </p>
              <p style={{
                margin: 0,
                fontSize: '32px',
                fontWeight: 'bold',
                color: purchase.remaining > 0 ? '#2e7d32' : '#d32f2f'
              }}>
                {purchase.remaining}
              </p>
            </div>
          </div>
        ))}
      </div>

      {purchases.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Trenutno nemate kupovina.
          </p>
          <button
            onClick={() => navigate('/member/purchases/buy')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Kupi prvi trening
          </button>
        </div>
      )}
    </div>
  );
}