
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/8543b8c6deaf423d86de49f6f5af1157",
      accounts: ["c56aa54b7fa0e0ff3243d01f50e2b274dfe40ba9526e52f89a24b9d780c59289"]
    }
  }
};
