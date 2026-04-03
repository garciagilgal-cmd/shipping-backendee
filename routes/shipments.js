const express = require('express');
const router = express.Router();

const { trackShipment } = require('../controllers/shipmentController');

// Public tracking route
router.get('/track/:trackingId', trackShipment);

module.exports = router;