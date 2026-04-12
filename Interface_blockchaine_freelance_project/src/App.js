import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PostJob from './pages/PostJob';
import JobList from './pages/JobList';
 
export default function App() {
  const [account, setAccount] = useState('');
  const [page, setPage] = useState('jobs');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x539' }],
      });
    }
  }, []);
 
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh',
                  background: '#f3f4f6' }}>
      <Navbar account={account} setAccount={setAccount} />
 
      <div style={{ display:'flex', gap:'1rem', padding:'1rem 2rem',
                    background:'white', borderBottom:'1px solid #e5e7eb' }}>
        <button onClick={() => setPage('jobs')}
          style={{ padding:'0.5rem 1rem', cursor:'pointer',
                   background: page==='jobs' ? '#7c3aed' : '#e5e7eb',
                   color: page==='jobs' ? 'white' : 'black',
                   border:'none', borderRadius:'6px' }}>
          Browse Jobs
        </button>
        <button onClick={() => setPage('post')}
          style={{ padding:'0.5rem 1rem', cursor:'pointer',
                   background: page==='post' ? '#7c3aed' : '#e5e7eb',
                   color: page==='post' ? 'white' : 'black',
                   border:'none', borderRadius:'6px' }}>
          Post a Job
        </button>
      </div>
 
      {page === 'jobs' && <JobList account={account} />}
      {page === 'post' && <PostJob />}
    </div>
  );
}