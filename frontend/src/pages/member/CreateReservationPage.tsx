import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTrainingTypes } from '../../services/trainingTypeService';
import type { TrainingType } from '../../types/TrainingType';

export default function CreateReservationPage() {
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainingTypes = async () => {
      try {
        const data = await getAllTrainingTypes();
        setTrainingTypes(data);
        setError('');
      } catch (err) {
        setError('Greška pri učitavanju tipova treninga');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingTypes();
  }, []);

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
          <h1 style={{ margin: '0 0 10px 0' }}>Izaberite tip treninga</h1>
          <p style={{ margin: 0, color: '#666' }}>Kliknite na tip treninga da vidite dostupne termine</p>
        </div>
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
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {trainingTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => navigate(`/member/sessions/${type.id}`)}
            style={{
              padding: '30px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              textAlign: 'center'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h3 style={{ margin: '0 0 15px 0', color: '#f57c00', fontSize: '24px' }}>
              🏃 {type.name}
            </h3>
            <p style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#2e7d32'
            }}>
              {type.price}€
            </p>
          </div>
        ))}
      </div>

      {trainingTypes.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#666' }}>
            Trenutno nema dostupnih tipova treninga.
          </p>
        </div>
      )}
    </div>
  );
}