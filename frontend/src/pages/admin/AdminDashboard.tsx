import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          <h1 style={{ margin: '0 0 10px 0' }}>{t('admin.title')}</h1>
          <p style={{ margin: 0, color: '#666' }}>{t('admin.welcome')}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <LanguageSwitcher />
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
            {t('admin.logout')}
          </button>
        </div>
      </div>

      <h2 style={{ marginBottom: '20px', color: '#1976d2' }}>{t('admin.adminFunctions')}</h2>
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
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>📍 {t('admin.addLocation')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('admin.addLocationDesc')}
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
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>👤 {t('admin.addEmployee')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('admin.addEmployeeDesc')}
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
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>👥 {t('admin.allEmployees')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('admin.allEmployeesDesc')}
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
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>🏋️ {t('admin.allMembers')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('admin.allMembersDesc')}
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
          <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>🏢 {t('admin.allLocations')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('admin.allLocationsDesc')}
          </p>
        </div>
      </div>

      <h2 style={{ marginBottom: '20px', color: '#2e7d32' }}>{t('admin.trainingManagement')}</h2>
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
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>👤 {t('admin.addMember')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('admin.addMemberDesc')}
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
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>🏃 {t('admin.addTrainingType')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('admin.addTrainingTypeDesc')}
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
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>📅 {t('admin.addSession')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('admin.addSessionDesc')}
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
          <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>📋 {t('admin.mySessions')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('admin.mySessionsDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}