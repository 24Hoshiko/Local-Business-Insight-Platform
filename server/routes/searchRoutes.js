const express = require("express");
const router = express.Router();
const { searchOrders } = require("../controllers/search.js");

router.get("/", searchOrders);

module.exports = router;