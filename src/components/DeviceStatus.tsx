
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDeviceContext, Device } from '@/context/DeviceContext';

const DeviceStatus: React.FC = () => {
  const { devices, selectedDevice } = useDeviceContext();
  
  if (!selectedDevice) {
    return null;
  }
  
  const device = devices.find(d => d.deviceId === selectedDevice);
  
  if (!device) {
    return null;
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  
  return (
    <Card className="card-gradient">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-medium">Device Information</CardTitle>
          <Badge variant={device.active ? "default" : "destructive"}>
            {device.active ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Device ID:</span>
              <span>{device.deviceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Name:</span>
              <span>{device.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Type:</span>
              <span>{device.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Location:</span>
              <span>{device.location}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">IP Address:</span>
              <span>{device.ipAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Firmware:</span>
              <span>{device.firmwareVersion}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Installed:</span>
              <span>{formatDate(device.installDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Last Maintenance:</span>
              <span>{formatDate(device.lastMaintenance)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceStatus;
