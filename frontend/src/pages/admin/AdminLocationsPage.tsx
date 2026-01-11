import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLocations, deleteLocation } from '../../services/locationService';
import type { Location } from '../../types/Location';

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const data = await getAllLocations();
      setLocations(data);
      setError('');
    } catch (err) {
      setError('Greška pri učitavanju lokacija');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Da li ste sigurni da želite da obrišete lokaciju "${name}"?`)) {
      return;
    }

    try {
      await deleteLocation(id);
      setLocations(locations.filter(loc => loc.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Greška pri brisanju lokacije');
    }
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
          <h1 style={{ margin: '0 0 10px 0' }}>Sve lokacije</h1>
          <p style={{ margin: 0, color: '#666' }}>Upravljajte lokacijama teretane</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/admin/locations/create')}
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
            Nova lokacija
          </button>
          <button
            onClick={() => navigate('/admin')}
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

      <div style={{
        display: 'grid',
        gap: '20px'
      }}>
        {locations.map((location) => (
          <div
            key={location.id}
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
            <div>
              <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
                📍 {location.name}
              </h3>
              <p style={{ margin: 0, color: '#666' }}>
                {location.address}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => navigate(`/admin/locations/edit/${location.id}`)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Izmeni
              </button>
              <button
                onClick={() => handleDelete(location.id, location.name)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Obriši
              </button>
            </div>
          </div>
        ))}
      </div>

      {locations.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Trenutno nema kreiranih lokacija.
          </p>
          <button
            onClick={() => navigate('/admin/locations/create')}
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
            Kreiraj prvu lokaciju
          </button>
        </div>
      )}
    </div>
  );
}