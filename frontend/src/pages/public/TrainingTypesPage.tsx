import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAllTrainingTypes } from '../../services/trainingTypeService';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';
import type { TrainingType } from '../../types/TrainingType';

export default function TrainingTypesPage() {
  const [trainingTypes, setTrainingTypes] = useState<TrainingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTrainingTypes = async () => {
      try {
        const data = await getAllTrainingTypes();
        setTrainingTypes(data);
      } catch (err) {
        setError(t('trainingTypes.error'));
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingTypes();
  }, [t]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>{t('trainingTypes.loading')}</p>
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
        <h1 style={{ margin: 0 }}>{t('trainingTypes.title')}</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <LanguageSwitcher />
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
            {t('trainingTypes.back')}
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {trainingTypes.map((type) => (
          <div
            key={type.id}
            style={{
              padding: '30px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 15px 0', color: '#f57c00' }}>
              🏃 {type.name}
            </h3>
            <p style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#2e7d32'
            }}>
              {type.price} €
            </p>
          </div>
        ))}
      </div>

      {trainingTypes.length === 0 && !loading && !error && (
        <p style={{ textAlign: 'center', color: '#666' }}>
          {t('trainingTypes.noTypes')}
        </p>
      )}
    </div>
  );
}