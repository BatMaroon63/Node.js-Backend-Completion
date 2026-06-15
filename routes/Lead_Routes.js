const express = require("express");

const {
    Import_leads
} = require("../controllers/main_controller");

const router = express.Router();

router.post("/import",Import_leads);

module.exports = router;