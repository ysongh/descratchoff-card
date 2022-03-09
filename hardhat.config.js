require("@nomiclabs/hardhat-waffle");

module.exports = {
  defaultNetwork: "hardhat",


  solidity: {
    version: "0.8.0",
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
