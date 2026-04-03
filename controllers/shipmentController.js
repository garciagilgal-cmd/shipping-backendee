const Shipment = require('../models/Shipment');

const trackShipment = async (req, res) => {
  try {
    const { trackingId } = req.params;

    const shipment = await Shipment.findOne({
      trackingId: {
        $regex: `^${String(trackingId).trim()}$`,
        $options: 'i'
      }
    });

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found. Please check your tracking ID and try again.'
      });
    }

    return res.json({
      success: true,
      data: shipment
    });
  } catch (error) {
    console.error('Tracking error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = { trackShipment };