import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI } from '../contract';

export default function JobList({ account }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJobs();
  }, [account]);

  async function loadJobs() {
    setLoading(true);
    try {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
      const data = await contract.getAllJobs();
      setJobs(data);
    } catch (err) {
      console.error('Erreur chargement:', err);
    } finally {
      setLoading(false);
    }
  }

  async function acceptJob(id) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.acceptJob(id);
      await tx.wait();
      loadJobs();
    } catch (err) {
      alert("Erreur lors de l'acceptation");
      console.error(err);
    }
  }

  async function approveJob(id) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const tx = await contract.approveJob(id);
      await tx.wait();
      loadJobs();
    } catch (err) {
      alert("Erreur lors de l'approbation");
      console.error(err);
    }
  }

  // Helper pour les badges de statut
  const getStatusStyle = (job) => {
    if (job.completed) return { bg: '#dcfce7', color: '#166534', text: '✅ Terminé' };
    if (job.accepted) return { bg: '#fef9c3', color: '#854d0e', text: '⏳ En cours' };
    return { bg: '#e0e7ff', color: '#3730a3', text: '🟢 Ouvert' };
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Offres Disponibles</h2>
        <button onClick={loadJobs} style={styles.refreshBtn} title="Actualiser">
          🔄
        </button>
      </div>

      {loading ? (
        <p style={styles.loading}>Chargement des jobs...</p>
      ) : jobs.length === 0 ? (
        <div style={styles.emptyState}>
          <p>Aucun job disponible pour le moment.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {jobs.map((job, i) => {
            const status = getStatusStyle(job);
            const isClient = account?.toLowerCase() === job.client?.toLowerCase();
            const canAccept = !job.accepted && !isClient;
            const canApprove = job.accepted && !job.completed && isClient;

            return (
              <div key={i} style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.jobTitle}>{job.title}</h3>
                  <span style={{ ...styles.badge, background: status.bg, color: status.color }}>
                    {status.text}
                  </span>
                </div>
                
                <p style={styles.description}>{job.description}</p>
                
                <div style={styles.cardFooter}>
                  <div style={styles.priceTag}>
                    💰 {ethers.formatEther(job.amount)} ETH
                  </div>
                  
                  <div style={styles.actions}>
                    {canAccept && (
                      <button style={styles.btnAccept} onClick={() => acceptJob(job.id)}>
                        Accepter
                      </button>
                    )}
                    {canApprove && (
                      <button style={styles.btnApprove} onClick={() => approveJob(job.id)}>
                        Valider & Payer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '1rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  refreshBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    opacity: 0.6,
    transition: '0.2s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f3f4f6',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '1rem',
  },
  jobTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#111827',
    margin: 0,
    paddingRight: '0.5rem',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    whiteSpace: 'nowrap',
  },
  description: {
    color: '#4b5563',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
    flex: 1,
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #f3f4f6',
    paddingTop: '1rem',
    marginTop: 'auto',
  },
  priceTag: {
    fontWeight: '700',
    color: '#7c3aed',
    fontSize: '1.1rem',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  btnAccept: {
    background: '#7c3aed',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  btnApprove: {
    background: '#10b981',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  loading: {
    textAlign: 'center',
    color: '#6b7280',
    padding: '2rem',
  },
  emptyState: {
    textAlign: 'center',
    color: '#9ca3af',
    padding: '3rem',
    background: '#f9fafb',
    borderRadius: '12px',
    border: '2px dashed #e5e7eb',
  },
};