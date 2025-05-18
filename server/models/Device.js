import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  lastMaintenance: {
    type: Date,
    default: Date.now
  },
  installDate: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String
  },
  firmwareVersion: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model('Device', DeviceSchema);
