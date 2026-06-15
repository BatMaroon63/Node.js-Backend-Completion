const express = require("express");
const router = express.Router();

const logs = require("../data/logs");

router.get("/", (req, res) => {
    res.json(logs.slice(-20).reverse());
});

module.exports = router;