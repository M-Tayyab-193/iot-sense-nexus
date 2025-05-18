
import { Request, Response } from 'express';
import Device from '../models/Device';

// Get all devices
export const getDevices = async (req: Request, res: Response): Promise<void> => {
  try {
    const devices = await Device.find().sort({ name: 1 });
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching devices', error });
  }
};

// Get a single device
export const getDevice = async (req: Request, res: Response): Promise<void> => {
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
export const createDevice = async (req: Request, res: Response): Promise<void> => {
  try {
    const device = new Device(req.body);
    const savedDevice = await device.save();
    res.status(201).json(savedDevice);
  } catch (error) {
    res.status(500).json({ message: 'Error creating device', error });
  }
};

// Update a device
export const updateDevice = async (req: Request, res: Response): Promise<void> => {
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
export const deleteDevice = async (req: Request, res: Response): Promise<void> => {
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
