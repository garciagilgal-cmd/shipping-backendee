const Shipment = require('../models/Shipment');

// PUBLIC TRACKING
const trackShipment = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const shipment = await Shipment.findOne({
      trackingId: trackingId.toUpperCase(),
      isActive: true
    });

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found. Please check your tracking ID and try again."
      });
    }

    res.json({
      success: true,
      data: shipment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

module.exports = {
  trackShipment
};