const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const LandriesController = require('../controllers/laundries.controller');
const laundriesController = new LandriesController();

router.post('/', authMiddleware, laundriesController.createLaundry);
router.patch('/', authMiddleware, laundriesController.updateLaundry);
router.delete('/', authMiddleware, laundriesController.deleteLaundry);
router.post('/:laundryIdx/comment', authMiddleware, laundriesController.createComment)

module.exports = router;