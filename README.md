#  Freelance3 Blockchain

A decentralized freelance platform built with **React**, **Solidity**, **Truffle** and **Ganache**.  
Clients can post jobs, freelancers can accept missions, and payments are handled automatically via smart contracts — no intermediary needed.

##  Features

- 📋 Post freelance jobs on the blockchain
- ✅ Accept and complete missions
- 💸 Automatic payment via smart contracts
- 🔐 Decentralized & trustless — no third party

##  Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Smart Contracts | Solidity |
| Blockchain Framework | Truffle |
| Local Blockchain | Ganache |
| Wallet | MetaMask |

## 📁 Project Structure

    projet_blockchaine_freelance/
    ├── Blockchaine_freelance_traffule/
    │   ├── contracts/
    │   │   └── freelance.sol
    │   ├── migrations/
    │   ├── build/
    │   └── truffle-config.js
    └── Interface_blockchaine_freelance_project/
        ├── src/
        │   ├── pages/
        │   │   ├── JobList.jsx
        │   │   └── PostJob.jsx
        │   ├── components/
        │   │   └── Navbar.jsx
        │   └── contract.js
        └── public/

## ⚙️ Getting Started

### Prerequisites
- Node.js
- Truffle : `npm install -g truffle`
- Ganache (GUI or CLI)
- MetaMask browser extension

### 1. Clone the repo
```bash
git clone https://github.com/SalamaBsd/freelance3-blockchain.git
cd freelance3-blockchain
```

### 2. Deploy smart contracts
```bash
cd Blockchaine_freelance_traffule
truffle migrate --reset
```

### 3. Run the frontend
```bash
cd ../Interface_blockchaine_freelance_project
npm install
npm start
```

### 4. Connect MetaMask
- Network: `localhost:7545`
- Import a Ganache account using its private key

## 📄 License

MIT
