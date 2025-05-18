import DeviceData from '../models/DeviceData.js';
import Device from '../models/Device.js';

// Create new device data
export const createDeviceData = async (req, res) => {
  try {
    const { deviceId } = req.body;
    
    // Check if the device exists
    const deviceExists = await Device.findOne({ deviceId });
    if (!deviceExists) {
      res.status(404).json({ message: 'Device not found' });
      return;
    }
    
    const deviceData = new DeviceData(req.body);
    const savedData = await deviceData.save();
    
    res.status(201).json(savedData);
  } catch (error) {
    console.error('Create device data error:', error);
    res.status(500).json({ message: 'Error creating device data', error });
  }
};

// Get latest data for a specific device
export const getLatestDeviceData = async (req, res) => {
  try {
    const { deviceId } = req.params;
    
    const latestData = await DeviceData.findOne({ deviceId })
      .sort({ timestamp: -1 })
      .limit(1);
    
    if (!latestData) {
      res.status(404).json({ message: 'No data found for this device' });
      return;
    }
    
    res.status(200).json(latestData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest device data', error });
  }
};

// Get latest data for all devices
export const getAllLatestDeviceData = async (req, res) => {
  try {
    // Get all devices
    const devices = await Device.find({}, { deviceId: 1 });
    const deviceIds = devices.map(device => device.deviceId);
    
    const latestData = await Promise.all(
      deviceIds.map(async (deviceId) => {
        const data = await DeviceData.findOne({ deviceId })
          .sort({ timestamp: -1 })
          .limit(1);
        
        return data;
      })
    );
    
    // Filter out null values
    const filteredData = latestData.filter(data => data !== null);
    
    res.status(200).json(filteredData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest device data for all devices', error });
  }
};

// Get historical data for a device
export const getDeviceDataHistory = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { limit = 100, startDate, endDate } = req.query;
    
    const query = { deviceId };
    
    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const data = await DeviceData.find(query)
      .sort({ timestamp: -1 })
      .limit(Number(limit));
    
    if (data.length === 0) {
      res.status(404).json({ message: 'No data found for this device' });
      return;
    }
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching device data history', error });
  }
};
