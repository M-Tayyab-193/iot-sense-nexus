
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { toast } from 'sonner';

// Types
export interface Device {
  _id: string;
  deviceId: string;
  name: string;
  type: string;
  location: string;
  active: boolean;
  lastMaintenance: string;
  installDate: string;
  ipAddress: string;
  firmwareVersion: string;
}

export interface DeviceData {
  _id: string;
  deviceId: string;
  temperature: number;
  humidity: number;
  waterLevel: number;
  lightIntensity: number;
  motionDetected: boolean;
  batteryLevel: number;
  timestamp: string;
}

interface DeviceContextProps {
  devices: Device[];
  deviceData: DeviceData[];
  selectedDevice: string | null;
  setSelectedDevice: (deviceId: string | null) => void;
  loading: boolean;
  error: string | null;
  fetchDevices: () => Promise<void>;
  fetchLatestData: () => Promise<void>;
  addDeviceData: (data: Partial<DeviceData>) => Promise<boolean>;
  addDevice: (data: Partial<Device>) => Promise<boolean>;
  historyData: DeviceData[];
  fetchDeviceHistory: (deviceId: string) => Promise<void>;
}

// API Base URL
const API_URL = 'http://localhost:5000/api';

// Create context
const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

// Provider component
export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState<DeviceData[]>([]);
  
  // Fetch all devices
  const fetchDevices = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/devices`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch devices');
      }
      
      const data = await response.json();
      setDevices(data);
      
      // Set the first device as selected if none is selected
      if (!selectedDevice && data.length > 0) {
        setSelectedDevice(data[0].deviceId);
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error('Failed to fetch devices');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch latest data for all devices
  const fetchLatestData = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/data/latest`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch latest data');
      }
      
      const data = await response.json();
      setDeviceData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching latest data:', err);
    }
  };
  
  // Fetch historical data for a device
  const fetchDeviceHistory = async (deviceId: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/data/history/${deviceId}?limit=50`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch device history');
      }
      
      const data = await response.json();
      setHistoryData(data.reverse()); // Reverse to show oldest first
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error('Failed to fetch device history');
    } finally {
      setLoading(false);
    }
  };
  
  // Add new device data
  const addDeviceData = async (data: Partial<DeviceData>): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add device data');
      }
      
      toast.success('Device data added successfully');
      fetchLatestData(); // Refresh data
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Add new device
  const addDevice = async (data: Partial<Device>): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/devices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add device');
      }
      
      toast.success('Device added successfully');
      fetchDevices(); // Refresh devices
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchDevices();
  }, []);
  
  // Set up polling for latest data
  useEffect(() => {
    fetchLatestData();
    
    const interval = setInterval(() => {
      fetchLatestData();
    }, 5000); // Poll every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Fetch device history when selected device changes
  useEffect(() => {
    if (selectedDevice) {
      fetchDeviceHistory(selectedDevice);
    }
  }, [selectedDevice]);
  
  const value = {
    devices,
    deviceData,
    selectedDevice,
    setSelectedDevice,
    loading,
    error,
    fetchDevices,
    fetchLatestData,
    addDeviceData,
    addDevice,
    historyData,
    fetchDeviceHistory,
  };
  
  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};

// Custom hook to use the device context
export const useDeviceContext = (): DeviceContextProps => {
  const context = useContext(DeviceContext);
  
  if (context === undefined) {
    throw new Error('useDeviceContext must be used within a DeviceProvider');
  }
  
  return context;
};
