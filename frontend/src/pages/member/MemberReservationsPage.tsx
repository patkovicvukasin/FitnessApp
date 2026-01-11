import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyReservations, cancelReservation } from '../../services/reservationService';
import type { MemberReservation } from '../../types/Reservation';

export default function MemberReservationsPage() {
  const [reservations, setReservations] = useState<MemberReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await getMyReservations();
      setReservations(data);
      setError('');
    } catch (err) {
      setError('Greška pri učitavanju rezervacija');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (id: number) => {
    if (!window.confirm('Da li ste sigurni da želite da otkažete ovu rezervaciju?')) {
      return;
    }

    try {
      await cancelReservation(id);
      setReservations(reservations.filter(r => r.id !== id));
      alert('Rezervacija otkazana!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Greška pri otkazivanju rezervacije');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('sr-RS', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Učitavanje...</p>
      </div>
    );
  }

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
          <h1 style={{ margin: '0 0 10px 0' }}>Moje rezervacije</h1>
          <p style={{ margin: 0, color: '#666' }}>Pregled svih rezervisanih termina</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/member/reservations/create')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Nova rezervacija
          </button>
          <button
            onClick={() => navigate('/member')}
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
            Nazad
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

      <div style={{ display: 'grid', gap: '20px' }}>
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>
                {reservation.trainingTypeName}
              </h3>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Termin: {formatDate(reservation.sessionStartTime)} - {formatDate(reservation.sessionEndTime)}
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Trener: {reservation.employeeFirstName} {reservation.employeeLastName}
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Lokacija: {reservation.locationName}
              </p>
              <p style={{ margin: '5px 0', color: '#999', fontSize: '14px' }}>
                Rezervisano: {formatDate(reservation.reservedAt)}
              </p>
            </div>
            <button
              onClick={() => handleCancel(reservation.id)}
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
              Otkaži
            </button>
          </div>
        ))}
      </div>

      {reservations.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Trenutno nemate rezervacija.
          </p>
          <button
            onClick={() => navigate('/member/reservations/create')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Kreiraj prvu rezervaciju
          </button>
        </div>
      )}
    </div>
  );
}