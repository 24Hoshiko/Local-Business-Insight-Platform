const express = require("express");
const router = express.Router();
const { searchOrders } = require("../controllers/search.controller.js");

router.get("/", searchOrders);

module.exports = router;