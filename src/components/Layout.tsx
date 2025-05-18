
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { DeviceProvider } from '@/context/DeviceContext';
import { Helmet } from 'react-helmet';

const Layout: React.FC = () => {
  return (
    <DeviceProvider>
      <div className="flex min-h-screen">
        <Helmet>
          <title>IoT Monitoring System</title>
          <meta name="description" content="Real-time IoT device monitoring dashboard" />
        </Helmet>
        
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </DeviceProvider>
  );
};

export default Layout;
