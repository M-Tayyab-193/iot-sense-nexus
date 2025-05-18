import Device from '../models/Device.js';

// Get all devices
export const getDevices = async (req, res) => {
  try {
    const devices = await Device.find().sort({ name: 1 });
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching devices', error });
  }
};

// Get a single device
export const getDevice = async (req, res) => {
  try {
    const device = await Device.findOne({ deviceId: req.params.id });
    if (!device) {
      res.status(404).json({ message: 'Device not found' });
      return;
    }
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching device', error });
  }
};

// Create a new device
export const createDevice = async (req, res) => {
  console.log("Received data:", req.body);
  try {
    const device = new Device(req.body);
    const savedDevice = await device.save();
    res.status(201).json(savedDevice);
    console.log("Saved device:", savedDevice);
  } catch (error) {
    res.status(500).json({ message: 'Error creating device', error });
  }
};

// Update a device
export const updateDevice = async (req, res) => {
  try {
    const device = await Device.findOneAndUpdate(
      { deviceId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!device) {
      res.status(404).json({ message: 'Device not found' });
      return;
    }
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: 'Error updating device', error });
  }
};

// Delete a device
export const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findOneAndDelete({ deviceId: req.params.id });
    if (!device) {
      res.status(404).json({ message: 'Device not found' });
      return;
    }
    res.status(200).json({ message: 'Device deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting device', error });
  }
};
