import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLocations } from '../../services/locationService';
import type { Location } from '../../types/Location';

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getAllLocations();
        setLocations(data);
      } catch (err) {
        setError('Greška pri učitavanju lokacija');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
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
        marginBottom: '40px'
      }}>
        <h1 style={{ margin: 0 }}>Naše lokacije</h1>
        <button
          onClick={() => navigate('/')}
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
        {locations.map((location) => (
          <div
            key={location.id}
            style={{
              padding: '30px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 15px 0', color: '#1976d2' }}>
              📍 {location.name}
            </h3>
            <p style={{ margin: 0, color: '#666' }}>
              {location.address}
            </p>
          </div>
        ))}
      </div>

      {locations.length === 0 && !loading && !error && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          Trenutno nema dostupnih lokacija.
        </p>
      )}
    </div>
  );
}