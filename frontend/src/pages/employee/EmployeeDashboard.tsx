import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function EmployeeDashboard() {
  const { user, logout } = useAuth();
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
          <h1 style={{ margin: '0 0 10px 0' }}>Employee Dashboard</h1>
          <p style={{ margin: 0, color: '#666' }}>Welcome, {user?.email}</p>
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
          Logout
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
        onClick={() => alert('Create Member - Coming soon!')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>👤 Create Member</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Add new member
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
        onClick={() => alert('Create Training Type - Coming soon!')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>🏃 Create Training Type</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Add new training type
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
        onClick={() => alert('Create Session - Coming soon!')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>📅 Create Session</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            Schedule new training session
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
        onClick={() => alert('My Sessions - Coming soon!')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>📋 My Sessions</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            View my training sessions
          </p>
        </div>
      </div>
    </div>
  );
}