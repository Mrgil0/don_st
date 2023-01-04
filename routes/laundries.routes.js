const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const LandriesController = require('../controllers/laundries.controller');
const laundriesController = new LandriesController();

router.post('/', authMiddleware, laundriesController.createLaundry);
router.put('/', authMiddleware, laundriesController.updateLaundry);

module.exports = router;