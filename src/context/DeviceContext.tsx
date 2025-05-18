
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

// Base URL for the API
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:5000/api';

export interface DeviceData {
  _id: string;
  deviceId: string;
  temperature?: number;
  humidity?: number;
  waterLevel?: number;
  lightIntensity?: number;
  motionDetected?: boolean;
  batteryLevel?: number;
  timestamp: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Device {
  _id: string;
  deviceId: string;
  name: string;
  type: string;
  location: string;
  active: boolean;
  lastMaintenance: string;
  installDate: string;
  ipAddress?: string;
  firmwareVersion?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface DeviceContextType {
  devices: Device[];
  deviceData: DeviceData[];
  historyData: DeviceData[];
  selectedDevice: string;
  loading: boolean;
  error: string | null;
  setSelectedDevice: (deviceId: string) => void;
  addDevice: (device: Omit<Device, '_id'>) => Promise<boolean>;
  addDeviceData: (data: Partial<DeviceData>) => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [historyData, setHistoryData] = useState<DeviceData[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all devices on component mount
  useEffect(() => {
    fetchDevices();
    
    // Start polling for latest device data
    const interval = setInterval(() => {
      fetchLatestData();
    }, 5000); // Poll every 5 seconds
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);
  
  // Fetch history data when selected device changes
  useEffect(() => {
    if (selectedDevice) {
      fetchHistoryData(selectedDevice);
    }
  }, [selectedDevice]);

  // Fetch all devices
  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/devices`);
      setDevices(response.data);
      
      if (response.data.length > 0 && !selectedDevice) {
        setSelectedDevice(response.data[0].deviceId);
      }
    } catch (err) {
      console.error('Error fetching devices:', err);
      setError('Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  };

  // Fetch latest data for all devices
  const fetchLatestData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/data/latest`);
      setDeviceData(response.data);
    } catch (err) {
      console.error('Error fetching latest data:', err);
      // Don't set error state to avoid showing error toast every 5 seconds
    }
  };

  // Fetch history data for a specific device
  const fetchHistoryData = async (deviceId: string) => {
    if (!deviceId) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/data/history/${deviceId}?limit=50`);
      setHistoryData(response.data.reverse()); // Reverse to show oldest to newest
    } catch (err) {
      console.error('Error fetching history data:', err);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  // Add a new device
  const addDevice = async (device: Omit<Device, '_id'>): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/devices`, device);
      setDevices(prev => [...prev, response.data]);
      
      // If this is the first device, select it
      if (!selectedDevice) {
        setSelectedDevice(response.data.deviceId);
      }
      
      return true;
    } catch (err: any) {
      console.error('Error adding device:', err);
      toast.error(err.response?.data?.message || 'Failed to add device');
      return false;
    }
  };

  // Add new device data
  const addDeviceData = async (data: Partial<DeviceData>): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/data`, {
        ...data,
        timestamp: new Date().toISOString()
      });
      
      // Refresh latest data
      fetchLatestData();
      
      // If this is for the selected device, refresh history as well
      if (data.deviceId === selectedDevice) {
        fetchHistoryData(selectedDevice);
      }
      
      return true;
    } catch (err: any) {
      console.error('Error adding device data:', err);
      toast.error(err.response?.data?.message || 'Failed to add device data');
      return false;
    }
  };

  // Manual refresh function
  const refreshData = async (): Promise<void> => {
    await fetchDevices();
    await fetchLatestData();
    if (selectedDevice) {
      await fetchHistoryData(selectedDevice);
    }
  };

  return (
    <DeviceContext.Provider
      value={{
        devices,
        deviceData,
        historyData,
        selectedDevice,
        loading,
        error,
        setSelectedDevice,
        addDevice,
        addDeviceData,
        refreshData
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDeviceContext must be used within a DeviceProvider');
  }
  return context;
};
