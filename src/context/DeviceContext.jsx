
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = process.env.NODE_ENV === 'production' ? "/api" : "http://localhost:5000/api";

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(() => {
      fetchLatestData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedDevice) {
      fetchHistoryData(selectedDevice);
    }
  }, [selectedDevice]);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/devices`);
      setDevices(response.data);
      if (response.data.length > 0 && !selectedDevice) {
        setSelectedDevice(response.data[0].deviceId);
      }
    } catch (err) {
      console.error("Error fetching devices:", err);
      setError("Failed to fetch devices");
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/data/latest`);
      setDeviceData(response.data);
    } catch (err) {
      console.error("Error fetching latest data:", err);
    }
  };

  const fetchHistoryData = async (deviceId) => {
    if (!deviceId) return;
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/data/history/${deviceId}?limit=50`);
      setHistoryData(response.data.reverse());
    } catch (err) {
      console.error("Error fetching history data:", err);
      setHistoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const addDevice = async (device) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/devices`, device);
      setDevices((prev) => [...prev, response.data]);
      if (!selectedDevice) {
        setSelectedDevice(response.data.deviceId);
      }
      return true;
    } catch (err) {
      console.error("Error adding device:", err);
      toast.error(err.response?.data?.message || "Failed to add device");
      return false;
    }
  };

  const addDeviceData = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/data`, {
        ...data,
        timestamp: new Date().toISOString(),
      });
      fetchLatestData();
      if (data.deviceId === selectedDevice) {
        fetchHistoryData(selectedDevice);
      }
      return true;
    } catch (err) {
      console.error("Error adding device data:", err);
      toast.error(err.response?.data?.message || "Failed to add device data");
      return false;
    }
  };

  const refreshData = async () => {
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
        refreshData,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error("useDeviceContext must be used within a DeviceProvider");
  }
  return context;
};
