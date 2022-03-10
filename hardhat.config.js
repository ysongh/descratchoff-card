require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    // npx hardhat run scripts/sample-script.js --network mumbai
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMYAPI_KEY}`,
      accounts: [process.env.PRIVATEKEY],
      chainId: 80001,
      gasPrice: 8000000000
    }
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  // set the path to compile the contracts
  paths: {
    artifacts: './src/artifacts',
    cache: './src/cache',
  }
};
