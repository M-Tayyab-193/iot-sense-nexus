
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDeviceContext } from '@/context/DeviceContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const DeviceInfo: React.FC = () => {
  const { devices, loading } = useDeviceContext();

  return (
    <div className="p-6 animate-fade-in">
      <Helmet>
        <title>Device Information | IoT Monitoring System</title>
      </Helmet>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Device Information</h1>
        <p className="text-muted-foreground">
          Overview of all registered IoT devices
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin-slow">
            <svg className="w-12 h-12 text-iot-purple" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {devices.length === 0 ? (
            <div className="col-span-full text-center p-12">
              <h2 className="text-xl font-semibold mb-2">No devices registered</h2>
              <p className="text-muted-foreground">
                Go to the Admin console to add new devices
              </p>
            </div>
          ) : (
            devices.map(device => (
              <Card key={device.deviceId} className="card-gradient">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{device.name}</CardTitle>
                    <Badge variant={device.active ? "default" : "destructive"} className="bg-opacity-80">
                      {device.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{device.type} in {device.location}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Device ID:</span>
                      <span>{device.deviceId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IP Address:</span>
                      <span>{device.ipAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Firmware:</span>
                      <span>{device.firmwareVersion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Install Date:</span>
                      <span>{new Date(device.installDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <p className="text-xs text-muted-foreground">
                    Last maintained: {new Date(device.lastMaintenance).toLocaleDateString()}
                  </p>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DeviceInfo;
