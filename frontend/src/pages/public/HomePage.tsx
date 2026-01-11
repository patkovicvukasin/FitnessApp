import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
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
          Dobrodošli u Fitness App
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#666',
          marginBottom: '50px'
        }}>
          Rezervišite termine, pratite svoje treninge i ostvarite svoje fitness ciljeve!
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
            Prijavi se
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
            Vidi lokacije
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
            Vidi tipove treninga
          </button>
        </div>
      </div>
    </div>
  );
}