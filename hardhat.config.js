require("@nomiclabs/hardhat-ethers");
require("dotenv").config({ path: "server/config/config.env" });

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.RPC_URL || "",
      accounts: process.env.DEPLOY_PRIVATE_KEY ? [process.env.DEPLOY_PRIVATE_KEY] : []
    }
  }
};
