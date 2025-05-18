
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDeviceContext, DeviceData } from '@/context/DeviceContext';
import DataCard from '@/components/DataCard';
import DeviceSelector from '@/components/DeviceSelector';
import DataLineChart from '@/components/DataLineChart';
import DeviceStatus from '@/components/DeviceStatus';
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  Sun, 
  Activity, 
  Battery
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { deviceData, historyData, selectedDevice, loading } = useDeviceContext();
  
  // Find data for the selected device
  const currentData = deviceData.find(data => data.deviceId === selectedDevice);
  
  return (
    <div className="p-6 animate-fade-in">
      <Helmet>
        <title>Dashboard | IoT Monitoring System</title>
      </Helmet>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">IoT Monitoring Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time sensor data from your connected devices
          </p>
        </div>
        <DeviceSelector />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin-slow">
            <Gauge className="w-12 h-12 text-iot-purple" />
          </div>
        </div>
      ) : !currentData ? (
        <div className="text-center p-12">
          <h2 className="text-xl font-semibold mb-2">No data available</h2>
          <p className="text-muted-foreground">
            Select a device or ensure your devices are transmitting data
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <DataCard 
              title="Temperature" 
              value={currentData.temperature} 
              icon={<Thermometer className="text-orange-400" />}
              unit="°C"
              colorClass="from-orange-500 to-red-500"
            />
            <DataCard 
              title="Humidity" 
              value={currentData.humidity} 
              icon={<Droplets className="text-blue-400" />}
              unit="%"
              colorClass="from-blue-500 to-cyan-500"
            />
            <DataCard 
              title="Water Level" 
              value={currentData.waterLevel} 
              icon={<Gauge className="text-cyan-400" />}
              unit="%"
              colorClass="from-cyan-500 to-teal-500"
            />
            <DataCard 
              title="Light Intensity" 
              value={currentData.lightIntensity} 
              icon={<Sun className="text-yellow-400" />}
              unit=" lux"
              colorClass="from-yellow-500 to-amber-500"
            />
            <DataCard 
              title="Motion" 
              value={currentData.motionDetected} 
              icon={<Activity className="text-green-400" />}
              colorClass="from-green-500 to-emerald-500"
            />
            <DataCard 
              title="Battery" 
              value={currentData.batteryLevel} 
              icon={<Battery className="text-purple-400" />}
              unit="%"
              colorClass="from-purple-500 to-violet-500"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <DataLineChart 
              data={historyData}
              dataKey="temperature"
              title="Temperature History"
              color="#f97316"
              unit="°C"
            />
            <DataLineChart 
              data={historyData}
              dataKey="humidity"
              title="Humidity History"
              color="#38bdf8"
              unit="%"
            />
          </div>
          
          <DeviceStatus />
        </>
      )}
    </div>
  );
};

export default Dashboard;
