
import mongoose from 'mongoose';

export interface IDevice {
  deviceId: string;
  name: string;
  type: string;
  location: string;
  active: boolean;
  lastMaintenance: Date;
  installDate: Date;
  ipAddress?: string;
  firmwareVersion?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const DeviceSchema = new mongoose.Schema<IDevice>({
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

export default mongoose.model<IDevice>('Device', DeviceSchema);
