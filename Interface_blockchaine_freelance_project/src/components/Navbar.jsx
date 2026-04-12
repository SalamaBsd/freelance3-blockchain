import { useState } from 'react';
import { ethers } from 'ethers';
 
export default function Navbar({ account, setAccount }) {
  async function connectWallet() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    setAccount(accounts[0]);
  }
  return (
    <nav style={styles.nav}>
      <h2 style={{ color: 'white', margin: 0 }}>🔗 FreeLance3</h2>
      {account
        ? <span style={styles.addr}>{account.slice(0,6)}...{account.slice(-4)}</span>
        : <button style={styles.btn} onClick={connectWallet}>Connect Wallet</button>
      }
    </nav>
  );
}
 
const styles = {
  nav:  { display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'1rem 2rem', background:'#1a1a2e' },
  btn:  { padding:'0.5rem 1rem', background:'#7c3aed', color:'white',
          border:'none', borderRadius:'8px', cursor:'pointer' },
  addr: { background:'#7c3aed55', color:'white', padding:'0.5rem 1rem',
          borderRadius:'8px' }
};
