import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../components/common/LanguageSwitcher';

export default function MemberDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
          <h1 style={{ margin: '0 0 10px 0' }}>{t('member.title')}</h1>
          <p style={{ margin: 0, color: '#666' }}>{t('member.welcome')}</p>
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
            {t('member.logout')}
          </button>
        </div>
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
        onClick={() => navigate('/member/purchases')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>💳 {t('member.myPurchases')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('member.myPurchasesDesc')}
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
        onClick={() => navigate('/member/purchases/buy')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>🛒 {t('member.buyTraining')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('member.buyTrainingDesc')}
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
        onClick={() => navigate('/member/reservations')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>📅 {t('member.myReservations')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('member.myReservationsDesc')}
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
        onClick={() => navigate('/member/reservations/create')}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>➕ {t('member.createReservation')}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {t('member.createReservationDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}