import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrainingSession } from '../../services/trainingSessionService';
import { getAllLocations } from '../../services/locationService';
import { getAllTrainingTypes } from '../../services/trainingTypeService';
import type { CreateTrainingSessionRequest } from '../../types/TrainingSession';
import type { Location } from '../../types/Location';
import type { TrainingType } from '../../types/TrainingType';
import { useAuth } from '../../hooks/useAuth';

export default function CreateSessionPage() {
  const [formData, setFormData] = useState<CreateTrainingSessionRequest>({
    startTime: '',
    endTime: '',
    maxCapacity: 10,
    locationId: 0,
    trainingTypeId: 0,
    employeeId: 0,
  });
  const [locations, setLocations] = useState<Location[]>([]);
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const getDashboardRoute = () => {
    return user?.role === 'ADMIN' ? '/admin' : '/employee';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locData, typeData] = await Promise.all([
          getAllLocations(),
          getAllTrainingTypes(),
        ]);
        
        setLocations(locData);
        setTrainingTypes(typeData);

        setFormData(prev => ({
          ...prev,
          locationId: locData[0]?.id || 0,
          trainingTypeId: typeData[0]?.id || 0,
          employeeId: 0,
        }));
      } catch (err) {
        setError('Greška pri učitavanju podataka');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createTrainingSession(formData);
      alert('Sesija uspešno kreirana!');
      navigate('/employee/sessions');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Greška pri kreiranju sesije');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{
        marginBottom: '40px',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '20px'
      }}>
        <h1 style={{ margin: '0 0 10px 0' }}>Nova trening sesija</h1>
        <p style={{ margin: 0, color: '#666' }}>Zakažite novu trening sesiju</p>
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

      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Početak sesije *
          </label>
          <input
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Kraj sesije *
          </label>
          <input
            type="datetime-local"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Maksimalan kapacitet *
          </label>
          <input
            type="number"
            min="1"
            value={formData.maxCapacity}
            onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) || 1 })}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Lokacija *
          </label>
          <select
            value={formData.locationId}
            onChange={(e) => setFormData({ ...formData, locationId: Number(e.target.value) })}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Tip treninga *
          </label>
          <select
            value={formData.trainingTypeId}
            onChange={(e) => setFormData({ ...formData, trainingTypeId: Number(e.target.value) })}
            required
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

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            disabled={loading}
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
            {loading ? 'Kreiranje...' : 'Kreiraj sesiju'}
          </button>
          <button
            type="button"
            onClick={() => navigate(getDashboardRoute())}
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
      </form>
    </div>
  );
}