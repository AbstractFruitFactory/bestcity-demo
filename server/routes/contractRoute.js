const express = require("express");
const { getContractValue } = require("../controllers/contractController");

const router = express.Router();

router.get("/contract/property/:id", getContractValue);

module.exports = router;
