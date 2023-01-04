const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const LandriesController = require('../controllers/laundries.controller');
const laundriesController = new LandriesController();

router.post('/', authMiddleware, laundriesController.createLaundry);

module.exports = router;