module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',   // Ganache runs here
      port: 7545,           // Ganache default port (NOT 8545!)
      network_id: '*',      // match any network
    },
  },
  compilers: {
    solc: {
      version: '0.8.0',
    }
  }
};
