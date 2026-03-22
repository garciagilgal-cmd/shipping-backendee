const express = require('express');
const router = express.Router();
const {
  getAllShipments,
  getShipment,
  createShipment,
  updateShipment,
  deleteShipment,
  trackShipment,
  addTimelineEvent,
  updateCustomsStatus,
  searchShipments
} = require('../controllers/shipmentController');

// Public tracking route
router.get('/track/:trackingId', trackShipment);

// Admin routes
router.route('/')
  .get(getAllShipments)
  .post(createShipment);

router.route('/search')
  .get(searchShipments);

router.route('/:id')
  .get(getShipment)
  .put(updateShipment)
  .delete(deleteShipment);

router.route('/:id/timeline')
  .post(addTimelineEvent);

router.route('/:id/customs')
  .put(updateCustomsStatus);

module.exports = router;
