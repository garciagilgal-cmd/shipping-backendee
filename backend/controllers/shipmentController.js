const Shipment = require('../models/Shipment');

// @desc    Get all shipments
// @route   GET /api/shipments
// @access  Private (Admin)
exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: shipments.length,
      data: shipments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single shipment by tracking ID (Public)
// @route   GET /api/shipments/track/:trackingId
// @access  Public
exports.trackShipment = async (req, res) => {
  try {
    const { trackingId } = req.params;
    
    const shipment = await Shipment.findOne({
      trackingId: { $regex: `^${String(trackingId).trim()}$`, $options: 'i' }
    });

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found. Please check your tracking ID and try again.'
      });
    }

    res.json({
      success: true,
      data: shipment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single shipment by ID
// @route   GET /api/shipments/:id
// @access  Private (Admin)
exports.getShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }

    res.json({
      success: true,
      data: shipment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new shipment
// @route   POST /api/shipments
// @access  Private (Admin)
exports.createShipment = async (req, res) => {
  try {
    // Generate tracking ID if not provided
    if (!req.body.trackingId) {
      req.body.trackingId = Shipment.generateTrackingId();
    }

    // Create initial timeline event
    const initialTimeline = [{
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      location: req.body.origin,
      status: 'Shipment Created',
      note: 'Shipment has been created and is awaiting pickup',
      icon: 'package'
    }];

    req.body.timelineHistory = initialTimeline;
    req.body.progressStep = 0;

    const shipment = await Shipment.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Shipment created successfully',
      data: shipment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create shipment',
      error: error.message
    });
  }
};

// @desc    Update shipment
// @route   PUT /api/shipments/:id
// @access  Private (Admin)
exports.updateShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }

    res.json({
      success: true,
      message: 'Shipment updated successfully',
      data: shipment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update shipment',
      error: error.message
    });
  }
};

// @desc    Delete shipment (soft delete)
// @route   DELETE /api/shipments/:id
// @access  Private (Admin)
exports.deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }

    res.json({
      success: true,
      message: 'Shipment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add timeline event to shipment
// @route   POST /api/shipments/:id/timeline
// @access  Private (Admin)
exports.addTimelineEvent = async (req, res) => {
  try {
    const { date, time, location, status, note, icon } = req.body;

    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }

    // Add new timeline event
    shipment.timelineHistory.push({
      date,
      time,
      location,
      status,
      note: note || '',
      icon: icon || 'package'
    });

    // Update current status and location
    shipment.currentStatus = status;
    shipment.currentLocation = location;

    // Update progress step based on status
    const progressMap = {
      'Shipment Created': 0,
      'Picked Up': 1,
      'At Origin Facility': 2,
      'In Transit': 3,
      'At Customs': 4,
      'Customs Clearance': 4,
      'Out for Delivery': 5,
      'Delivered': 6
    };

    if (progressMap[status] !== undefined) {
      shipment.progressStep = progressMap[status];
    }

    await shipment.save();

    res.json({
      success: true,
      message: 'Timeline event added successfully',
      data: shipment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add timeline event',
      error: error.message
    });
  }
};

// @desc    Update customs status
// @route   PUT /api/shipments/:id/customs
// @access  Private (Admin)
exports.updateCustomsStatus = async (req, res) => {
  try {
    const { customsStatus, note } = req.body;

    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: 'Shipment not found'
      });
    }

    shipment.customsStatus = customsStatus;

    // Add timeline event for customs update
    if (note) {
      shipment.timelineHistory.push({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().split(' ')[0].substring(0, 5),
        location: shipment.currentLocation || 'Customs Facility',
        status: `Customs Update: ${customsStatus}`,
        note: note,
        icon: 'customs'
      });
    }

    await shipment.save();

    res.json({
      success: true,
      message: 'Customs status updated successfully',
      data: shipment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update customs status',
      error: error.message
    });
  }
};

// @desc    Search shipments
// @route   GET /api/shipments/search
// @access  Private (Admin)
exports.searchShipments = async (req, res) => {
  try {
    const { query } = req.query;
    
    const shipments = await Shipment.find({
      $and: [
        { isActive: true },
        {
          $or: [
            { trackingId: { $regex: query, $options: 'i' } },
            { goodsName: { $regex: query, $options: 'i' } },
            { senderName: { $regex: query, $options: 'i' } },
            { receiverName: { $regex: query, $options: 'i' } },
            { origin: { $regex: query, $options: 'i' } },
            { destination: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: shipments.length,
      data: shipments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
