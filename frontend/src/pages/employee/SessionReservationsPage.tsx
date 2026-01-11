import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getReservationsBySession, cancelReservation } from '../../services/reservationService';
import type { EmployeeReservation } from '../../types/Reservation';

export default function SessionReservationsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [reservations, setReservations] = useState<EmployeeReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await getReservationsBySession(Number(sessionId));
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
  }, [sessionId]);

  const handleCancel = async (reservationId: number, memberName: string) => {
    if (!window.confirm(`Da li ste sigurni da želite da otkažete rezervaciju za ${memberName}?`)) {
      return;
    }

    try {
      await cancelReservation(reservationId);
      setReservations(reservations.filter(r => r.id !== reservationId));
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
          <h1 style={{ margin: '0 0 10px 0' }}>Rezervacije za sesiju</h1>
          <p style={{ margin: 0, color: '#666' }}>
            Ukupno rezervacija: {reservations.length}
          </p>
        </div>
        <button
          onClick={() => navigate('/employee/sessions')}
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

      <div style={{ display: 'grid', gap: '15px' }}>
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
            <div>
              <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>
                👤 {reservation.memberFirstName} {reservation.memberLastName}
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                Rezervisano: {formatDate(reservation.reservedAt)}
              </p>
            </div>
            <button
              onClick={() => handleCancel(reservation.id, `${reservation.memberFirstName} ${reservation.memberLastName}`)}
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
              Otkaži rezervaciju
            </button>
          </div>
        ))}
      </div>

      {reservations.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#666' }}>
            Trenutno nema rezervacija za ovu sesiju.
          </p>
        </div>
      )}
    </div>
  );
}