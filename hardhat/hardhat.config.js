require("@nomicfoundation/hardhat-toolbox");
const { resolve } = require("path");
const { config: dotenvConfig } = require("dotenv");

dotenvConfig({ path: resolve(process.cwd(), "./.env") });

const mnemonic = process.env.MNEMONIC;
const apiKey = process.env.POLYGONSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: {
      polygonMumbai: apiKey,
    },
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic,
      },
      chainId: 31337,
    },
    mumbai: {
      accounts: {
        count: 10,
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
      chainId: 80001,
      url: "https://rpc.ankr.com/polygon_mumbai",
    },
  },
  solidity: "0.8.19",
};
