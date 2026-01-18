require("dotenv").config();
const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function main() {
  const ContractFactory = await ethers.getContractFactory("Contract");
  const contract = await ContractFactory.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
  const deploymentPath = path.join(__dirname, "..", "server", "contractDeployment.json");
  const payload = {
    network: hre.network.name,
    address: contract.address,
    deployedAt: new Date().toISOString()
  };
  fs.writeFileSync(deploymentPath, JSON.stringify(payload, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
