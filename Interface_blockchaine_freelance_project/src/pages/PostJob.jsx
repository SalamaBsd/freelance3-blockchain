import { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, ABI } from '../contract';

export default function PostJob() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePost() {
    if (!title || !amount) {
      setStatus({ type: 'error', msg: 'Veuillez remplir le titre et le montant.' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'loading', msg: 'Transaction en cours sur la blockchain...' });

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      
      const tx = await contract.postJob(title, desc, {
        value: ethers.parseEther(amount)
      });
      
      await tx.wait();
      
      setStatus({ type: 'success', msg: '✅ Job publié avec succès !' });
      setTitle(''); setDesc(''); setAmount('');
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', msg: '❌ Echec: ' + (err.reason || err.message) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Publier une Mission</h2>
        <p style={styles.subtitle}>Décrivez votre besoin et définissez le budget.</p>
        
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Titre du poste</label>
            <input 
              style={styles.input} 
              placeholder="Ex: Développement Site Web" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea 
              style={{...styles.input, minHeight: '120px', resize: 'vertical'}} 
              placeholder="Détails de la mission..." 
              value={desc} 
              onChange={e => setDesc(e.target.value)} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Budget (ETH)</label>
            <input 
              style={styles.input} 
              type="number" 
              step="0.01" 
              placeholder="0.5" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
            />
          </div>

          <button 
            style={loading ? {...styles.btn, opacity: 0.7, cursor: 'not-allowed'} : styles.btn} 
            onClick={handlePost} 
            disabled={loading}
          >
            {loading ? 'Envoi en cours...' : 'Publier la Mission 🚀'}
          </button>
        </div>

        {status && (
          <div style={{
            ...styles.statusBox,
            background: status.type === 'success' ? '#dcfce7' : (status.type === 'error' ? '#fee2e2' : '#eff6ff'),
            color: status.type === 'success' ? '#166534' : (status.type === 'error' ? '#991b1b' : '#1e40af'),
            borderColor: status.type === 'success' ? '#bbf7d0' : (status.type === 'error' ? '#fecaca' : '#dbeafe'),
          }}>
            {status.msg}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem 1rem',
    background: '#f9fafb',
    minHeight: '100%',
  },
  card: {
    background: 'white',
    width: '100%',
    maxWidth: '500px',
    padding: '2.5rem',
    borderRadius: '20px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e5e7eb',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '0.95rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  },
  btn: {
    marginTop: '1rem',
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 6px -1px rgba(124, 58, 237, 0.4)',
    transition: 'transform 0.1s, box-shadow 0.2s',
  },
  statusBox: {
    marginTop: '1.5rem',
    padding: '1rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    textAlign: 'center',
    fontWeight: '500',
    border: '1px solid transparent',
    animation: 'fadeIn 0.3s ease-in-out',
  },
};