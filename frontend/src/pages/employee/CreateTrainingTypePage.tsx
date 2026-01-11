import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrainingType } from '../../services/trainingTypeService';
import type { CreateTrainingTypeRequest } from '../../types/TrainingType';
import { useAuth } from '../../hooks/useAuth';

export default function CreateTrainingTypePage() {
  const [formData, setFormData] = useState<CreateTrainingTypeRequest>({
    name: '',
    price: 0,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const getDashboardRoute = () => {
    return user?.role === 'ADMIN' ? '/admin' : '/employee';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createTrainingType(formData);
      alert('Tip treninga uspešno kreiran!');
      navigate(getDashboardRoute());
    } catch (err: any) {
      setError(err.response?.data?.message || 'Greška pri kreiranju tipa treninga');
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
        <h1 style={{ margin: '0 0 10px 0' }}>Novi tip treninga</h1>
        <p style={{ margin: 0, color: '#666' }}>Dodajte novi tip treninga</p>
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
            Naziv treninga *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="npr. Yoga, CrossFit, Pilates"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Cena (€) *
          </label>
          <input
            type="number"
            step="1"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
            required
            placeholder="npr. 20.00"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
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
            {loading ? 'Kreiranje...' : '✓ Kreiraj tip treninga'}
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