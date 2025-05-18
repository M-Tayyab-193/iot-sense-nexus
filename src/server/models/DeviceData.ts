
import mongoose from 'mongoose';

export interface IDeviceData {
  deviceId: string;
  temperature?: number;
  humidity?: number;
  waterLevel?: number;
  lightIntensity?: number;
  motionDetected?: boolean;
  batteryLevel?: number;
  timestamp: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const DeviceDataSchema = new mongoose.Schema<IDeviceData>({
  deviceId: {
    type: String,
    required: true,
    ref: 'Device'
  },
  temperature: {
    type: Number
  },
  humidity: {
    type: Number
  },
  waterLevel: {
    type: Number
  },
  lightIntensity: {
    type: Number
  },
  motionDetected: {
    type: Boolean
  },
  batteryLevel: {
    type: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for faster queries by deviceId and timestamp
DeviceDataSchema.index({ deviceId: 1, timestamp: -1 });

export default mongoose.model<IDeviceData>('DeviceData', DeviceDataSchema);
