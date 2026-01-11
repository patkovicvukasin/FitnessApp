import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMembers, deleteMember } from '../../services/memberService';
import type { Member } from '../../types/Member';

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await getAllMembers();
      setMembers(data);
      setError('');
    } catch (err) {
      setError('Greška pri učitavanju članova');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Da li ste sigurni da želite da obrišete člana "${name}"?`)) {
      return;
    }

    try {
      await deleteMember(id);
      setMembers(members.filter(mem => mem.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Greška pri brisanju člana');
    }
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
          <h1 style={{ margin: '0 0 10px 0' }}>Svi članovi</h1>
          <p style={{ margin: 0, color: '#666' }}>Pregled svih članova</p>
        </div>
        <button
          onClick={() => navigate('/admin')}
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
        {members.map((member) => (
          <div
            key={member.id}
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
              <h3 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>
                🏋️ {member.firstName} {member.lastName}
              </h3>
              <p style={{ margin: 0, color: '#666' }}>
                📍 {member.locationName}, {member.locationAddress}
              </p>
            </div>
            <button
              onClick={() => handleDelete(member.id, `${member.firstName} ${member.lastName}`)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Obriši
            </button>
          </div>
        ))}
      </div>

      {members.length === 0 && !loading && !error && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ color: '#666' }}>
            Trenutno nema članova.
          </p>
        </div>
      )}
    </div>
  );
}