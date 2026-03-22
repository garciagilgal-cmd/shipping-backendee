const mongoose = require('mongoose');

const timelineEventSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  note: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: 'package'
  }
}, { _id: true });

const shipmentSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  goodsName: {
    type: String,
    required: true
  },
  goodsType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  weight: {
    type: String,
    required: true
  },
  shippingClass: {
    type: String,
    required: true,
    enum: ['Standard', 'Express', 'Priority', 'Overnight', 'Economy']
  },
  packageCondition: {
    type: String,
    default: 'Good',
    enum: ['Excellent', 'Good', 'Fair', 'Damaged']
  },
  referenceNumber: {
    type: String,
    default: ''
  },
  senderName: {
    type: String,
    required: true
  },
  receiverName: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  currentLocation: {
    type: String,
    default: ''
  },
  estimatedDeliveryDate: {
    type: String,
    required: true
  },
  currentStatus: {
    type: String,
    required: true,
    enum: [
      'Shipment Created',
      'Picked Up',
      'At Origin Facility',
      'In Transit',
      'At Customs',
      'Customs Clearance',
      'Out for Delivery',
      'Delivered',
      'Exception'
    ]
  },
  customsStatus: {
    type: String,
    default: 'Not Applicable',
    enum: [
      'Not Applicable',
      'Awaiting Customs Review',
      'Under Customs Inspection',
      'Customs Processing',
      'Customs Cleared',
      'Released by Customs',
      'Held at Customs'
    ]
  },
  progressStep: {
    type: Number,
    default: 0,
    min: 0,
    max: 6
  },
  timelineHistory: [timelineEventSchema],
  notes: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
shipmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to generate tracking ID
shipmentSchema.statics.generateTrackingId = function() {
  const prefix = 'TRK';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

module.exports = mongoose.model('Shipment', shipmentSchema);
