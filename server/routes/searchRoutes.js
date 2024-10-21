const express = require("express");
const router = express.Router();
const { searchOrders } = require("../controllers/searchController.js");

router.get("/", searchOrders);

module.exports = router;