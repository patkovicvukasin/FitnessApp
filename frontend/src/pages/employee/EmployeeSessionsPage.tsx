import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getMyTrainingSessions, deleteTrainingSession } from '../../services/trainingSessionService';
import { websocketService } from '../../services/websocketService';
import type { TrainingSession } from '../../types/TrainingSession';

export default function EmployeeSessionsPage() {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [wsConnected, setWsConnected] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const getDashboardRoute = () => {
    return user?.role === 'ADMIN' ? '/admin' : '/employee';
  };

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const data = await getMyTrainingSessions();
      setSessions(data);
      setError('');
    } catch (err) {
      setError('Greška pri učitavanju sesija');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    const connectWs = async () => {
      try {
        await websocketService.connect();
        setWsConnected(true);
      } catch (err) {
        console.error('Failed to connect WebSocket:', err);}
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
          console.log(`📊 Employee view: Updating session ${data.sessionId}`);
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

  const handleDelete = async (id: number) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete ovu sesiju?')) {
      return;
    }

    try {
      await deleteTrainingSession(id);
      setSessions(sessions.filter(s => s.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Greška pri brisanju sesije');
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
          <h1 style={{ margin: '0 0 10px 0' }}>Moje sesije</h1>
          <p style={{ margin: 0, color: '#666' }}>
            Pregled svih mojih trening sesija
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/employee/sessions/create')}
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
            Nova sesija
          </button>
          <button
            onClick={() => navigate(getDashboardRoute())}
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
        {sessions.map((session) => (
          <div
            key={session.id}
            style={{
              padding: '20px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '15px'
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#2e7d32' }}>
                  {session.trainingTypeName}
                </h3>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  📅 {formatDate(session.startTime)} - {formatDate(session.endTime)}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  📍 {session.locationName}, {session.locationAddress}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  👤 {session.employeeFirstName} {session.employeeLastName}
                </p>
                <p style={{
                  margin: '10px 0 0 0',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: session.availableSlots > 0 ? '#2e7d32' : '#d32f2f'
                }}>
                  Kapacitet: {session.availableSlots}/{session.maxCapacity} slobodno
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '150px' }}>
                <button
                  onClick={() => navigate(`/employee/sessions/${session.id}/reservations`)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#1976d2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Rezervacije
                </button>
                <button
                  onClick={() => handleDelete(session.id)}
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
                  Obriši sesiju
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sessions.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Trenutno nemate kreiranih sesija.
          </p>
          <button
            onClick={() => navigate('/employee/sessions/create')}
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
            Kreiraj prvu sesiju
          </button>
        </div>
      )}
    </div>
  );
}