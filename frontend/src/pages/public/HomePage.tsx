import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px'
      }}>
        <LanguageSwitcher />
      </div>

      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        padding: '40px'
      }}>
        <h1 style={{
          fontSize: '48px',
          marginBottom: '20px',
          color: '#1976d2'
        }}>
          {t('home.title')}
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '50px'
        }}>
          {t('home.subtitle')}
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1565c0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
          >
            {t('home.login')}
          </button>

          <button
            onClick={() => navigate('/locations')}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1b5e20'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2e7d32'}
          >
            {t('home.viewLocations')}
          </button>

          <button
            onClick={() => navigate('/training-types')}
            style={{
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: '#f57c00',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e65100'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f57c00'}
          >
            {t('home.viewTrainingTypes')}
          </button>
        </div>
      </div>
    </div>
  );
}