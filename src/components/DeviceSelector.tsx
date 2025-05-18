
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useDeviceContext } from '@/context/DeviceContext';

const DeviceSelector: React.FC = () => {
  const { devices, selectedDevice, setSelectedDevice } = useDeviceContext();
  
  const handleDeviceChange = (deviceId: string) => {
    setSelectedDevice(deviceId);
  };
  
  return (
    <div className="w-full max-w-xs">
      <Select
        value={selectedDevice || ''}
        onValueChange={handleDeviceChange}
      >
        <SelectTrigger className="bg-muted/50 border-muted">
          <SelectValue placeholder="Select a device" />
        </SelectTrigger>
        <SelectContent>
          {devices.map((device) => (
            <SelectItem 
              key={device.deviceId} 
              value={device.deviceId}
              className="cursor-pointer"
            >
              {device.name} ({device.location})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DeviceSelector;
