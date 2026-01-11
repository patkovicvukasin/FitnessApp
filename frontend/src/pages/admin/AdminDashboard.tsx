import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        borderBottom: '2px solid #e0e0e0',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ margin: '0 0 10px 0' }}>Admin Panel</h1>
          <p style={{ margin: 0, color: '#666' }}>Dobrodošli</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Izloguj se
        </button>
      </div>

      <h2 style={{ marginBottom: '20px', color: '#1976d2' }}>Admin funkcije</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/admin/locations/create')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>📍 Dodaj lokaciju</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Kreiraj novu lokaciju teretane
          </p>
        </div>

        <div style={{
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/admin/employees/create')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>👤 Dodaj zaposlenog</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Dodaj novog zaposlenog
          </p>
        </div>

        <div style={{
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/admin/employees')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>👥 Svi zaposleni</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Pogledaj sve zaposlene
          </p>
        </div>

        <div style={{
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/admin/members')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>🏋️ Svi članovi</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Pogledaj sve članove
          </p>
        </div>

        <div style={{
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/admin/locations')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>🏢 Sve lokacije</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Pogledaj sve lokacije
          </p>
        </div>
      </div>

      <h2 style={{ marginBottom: '20px', color: '#2e7d32' }}>Upravljanje treninzima</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        <div style={{
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/employee/members/create')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>👤 Dodaj člana</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Kreiraj novog člana
          </p>
        </div>

        <div style={{
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/employee/training-types/create')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>🏃 Dodaj tip treninga</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Kreiraj novi tip treninga
          </p>
        </div>

        <div style={{
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/employee/sessions/create')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>📅 Dodaj sesiju</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Zakaži novu trening sesiju
          </p>
        </div>

        <div style={{
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        onClick={() => navigate('/employee/sessions')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>📋 Moje sesije</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Pogledaj svoje sesije
          </p>
        </div>
      </div>
    </div>
  );
}