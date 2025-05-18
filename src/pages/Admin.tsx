
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminDataForm from '@/components/AdminDataForm';
import AdminDeviceForm from '@/components/AdminDeviceForm';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('data');
  
  return (
    <div className="p-6 animate-fade-in">
      <Helmet>
        <title>Admin Console | IoT Monitoring System</title>
      </Helmet>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin Console</h1>
        <p className="text-muted-foreground">
          Manage your IoT devices and submit sensor data
        </p>
      </div>
      
      <Tabs defaultValue="data" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="data">Add Device Data</TabsTrigger>
          <TabsTrigger value="devices">Manage Devices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data" className="animate-fade-in">
          <AdminDataForm />
        </TabsContent>
        
        <TabsContent value="devices" className="animate-fade-in">
          <AdminDeviceForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
