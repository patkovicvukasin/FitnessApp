import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createReservation } from '../../services/reservationService';
import { getSessionsByTrainingType } from '../../services/trainingSessionService';
import type { TrainingSession } from '../../types/TrainingSession';
import { websocketService } from '../../services/websocketService';

export default function SessionByTypePage() {
  const { typeId } = useParams<{ typeId: string }>();
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reservingId, setReservingId] = useState<number | null>(null);
  const [wsConnected, setWsConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const data = await getSessionsByTrainingType(Number(typeId));
        setSessions(data);
        setError('');
      } catch (err) {
        setError('Greška pri učitavanju sesija');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [typeId]);

  useEffect(() => {
    const connectWs = async () => {
      try {
        await websocketService.connect();
        setWsConnected(true);
      } catch (err) {
        console.error('Failed to connect WebSocket:', err);
      }
    };

    connectWs();

    return () => {
      websocketService.disconnect();
      setWsConnected(false);
    };
  }, []);

  useEffect(() => {
    if (!wsConnected || sessions.length === 0) {
      return;
    }

    const unsubscribers: (() => void)[] = [];

    sessions.forEach((session) => {
      const unsubscribe = websocketService.subscribeToSessionCapacity(
        session.id,
        (data) => {
          console.log(`Updating session ${data.sessionId} capacity:`, data);
          setSessions((prev) =>
            prev.map((s) =>
              s.id === data.sessionId
                ? { ...s, availableSlots: data.availableSlots }
                : s
            )
          );
        }
      );

      if (unsubscribe) {
        unsubscribers.push(unsubscribe);
      }
    });

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [wsConnected, sessions.length]);

  const handleReserve = async (sessionId: number) => {
    setError('');
    setReservingId(sessionId);

    try {
      await createReservation({ trainingSessionId: sessionId });
      alert('Rezervacija uspešno kreirana!');
      navigate('/member/reservations');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Greška pri kreiranju rezervacije');
    } finally {
      setReservingId(null);
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
          <h1 style={{ margin: '0 0 10px 0' }}>
            Dostupni termini - {sessions[0]?.trainingTypeName || 'Trening'}
          </h1>
          <p style={{ margin: 0, color: '#666' }}>
            Izaberite termin za rezervaciju
            {wsConnected && <span style={{ color: '#2e7d32', marginLeft: '10px' }}>🟢 Live</span>}
          </p>
        </div>
        <button
          onClick={() => navigate('/member/reservations/create')}
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

      <div style={{ display: 'grid', gap: '20px' }}>
        {sessions.map((session) => (
          <div
            key={session.id}
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
                {session.trainingTypeName}
              </h3>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Termin: {formatDate(session.startTime)} - {formatDate(session.endTime)}
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Trener: {session.employeeFirstName} {session.employeeLastName}
              </p>
              <p style={{ margin: '5px 0', color: '#666' }}>
                Lokacija: {session.locationName}, {session.locationAddress}
              </p>
            </div>
            <div style={{ textAlign: 'right', minWidth: '150px' }}>
              <p style={{
                margin: '0 0 15px 0',
                fontSize: '20px',
                fontWeight: 'bold',
                color: session.availableSlots > 0 ? '#2e7d32' : '#d32f2f'
              }}>
                {session.availableSlots}/{session.maxCapacity} slobodno
              </p>
              <button
                onClick={() => handleReserve(session.id)}
                disabled={reservingId === session.id || session.availableSlots === 0}
                style={{
                  padding: '10px 20px',
                  backgroundColor: session.availableSlots === 0 ? '#ccc' : '#2e7d32',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: session.availableSlots === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {reservingId === session.id ? 'Rezerviše se...' : session.availableSlots === 0 ? 'Popunjeno' : 'Rezerviši'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {sessions.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Trenutno nema dostupnih termina za ovaj tip treninga.
          </p>
          <button
            onClick={() => navigate('/member/reservations/create')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Izaberi drugi tip
          </button>
        </div>
      )}
    </div>
  );
}