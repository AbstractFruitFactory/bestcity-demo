const fs = require("fs");
const path = require("path");

const artifactPath = path.join(
  __dirname,
  "..",
  "artifacts",
  "contracts",
  "Contract.sol",
  "Contract.json"
);
const outputPath = path.join(__dirname, "..", "src", "abi", "Contract.json");

const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf-8"));
const abiPayload = { abi: artifact.abi };

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(abiPayload, null, 2));
