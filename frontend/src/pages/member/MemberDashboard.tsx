import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function MemberDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
          <h1 style={{ margin: '0 0 10px 0' }}>Panel člana</h1>
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
        onClick={() => alert('My Purchases - Coming soon!')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>💳 Moje kupovine</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Pogledaj svoje kupovine treninga
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
        onClick={() => alert('Buy Training - Coming soon!')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>🛒 Kupi trening</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Kupi kredite za trening 
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
        onClick={() => alert('My Reservations - Coming soon!')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>📅 Moje rezervacije</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Pogledaj svoje rezervisane termine
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
        onClick={() => alert('Create Reservation - Coming soon!')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>➕ Kreiraj rezervaciju</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Rezerviši termin treninga
          </p>
        </div>
      </div>
    </div>
  );
}