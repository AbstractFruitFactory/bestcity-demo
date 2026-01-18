const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const getContractAbi = () => {
  const abiPath = path.join(__dirname, "..", "..", "src", "abi", "Contract.json");
  if (!fs.existsSync(abiPath)) {
    throw new Error("Contract ABI is missing");
  }
  const artifact = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
  if (!artifact?.abi?.length) {
    throw new Error("Contract ABI is missing");
  }
  return artifact.abi;
};

const getDeploymentAddress = () => {
  const deploymentPath = path.join(__dirname, "..", "contractDeployment.json");
  if (!fs.existsSync(deploymentPath)) {
    throw new Error("contractDeployment.json is missing");
  }
  const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf-8"));
  if (!deployment?.address) {
    throw new Error("contractDeployment.json is missing address");
  }
  return deployment.address;
};

const getContract = () => {
  const rpcUrl = process.env.RPC_URL;
  const contractAddress = getDeploymentAddress();

  if (!rpcUrl) {
    throw new Error("RPC_URL is not set");
  }

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  const contractAbi = getContractAbi();
  const contract = new ethers.Contract(contractAddress, contractAbi, provider);

  return { contract, contractAddress };
};

const getPropertyKey = (propertyId) => {
  if (!propertyId) {
    throw new Error("propertyId is required");
  }
  return ethers.BigNumber.from(`0x${propertyId}`);
};

exports.getContractValue = async (req, res) => {
  try {
    const { contract, contractAddress } = getContract();
    const propertyKey = getPropertyKey(req.params.id);
    const total = await contract.getTotalInvested(propertyKey);
    const investor = req.query.investor;
    let investorAmount = null;
    if (investor) {
      const amount = await contract.getInvestorAmount(propertyKey, investor);
      investorAmount = amount.toString();
    }
    return res.status(200).json({
      propertyId: req.params.id,
      contractAddress,
      totalInvested: total.toString(),
      investorAmount
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Failed to read contract" });
  }
};
