
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="p-6 animate-fade-in">
      <Helmet>
        <title>About | IoT Monitoring System</title>
      </Helmet>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">About This Project</h1>
        <p className="text-muted-foreground">
          Learn more about the IoT Monitoring System
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>
              Real-time IoT Monitoring System
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              This application is a comprehensive IoT monitoring solution built using the MERN stack (MongoDB, Express, React, Node.js). It provides real-time monitoring of IoT device data through an intuitive and responsive interface.
            </p>
            <p className="text-sm">
              The system allows users to track various sensor readings, including temperature, humidity, water level, light intensity, motion detection, and battery status across multiple IoT devices. Data is updated in real-time and displayed through interactive charts for easy analysis and interpretation.
            </p>
            <p className="text-sm">
              This project demonstrates advanced web development concepts, including real-time data handling, RESTful API design, data visualization, and responsive UI/UX implementation.
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Technologies Used</CardTitle>
            <CardDescription>
              Key technologies and libraries powering this application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li><span className="font-medium">Frontend:</span> React, TypeScript, Tailwind CSS, Recharts</li>
              <li><span className="font-medium">State Management:</span> React Context API, useState, useEffect</li>
              <li><span className="font-medium">Backend:</span> Node.js, Express</li>
              <li><span className="font-medium">Database:</span> MongoDB Atlas</li>
              <li><span className="font-medium">ODM:</span> Mongoose for schema validation and queries</li>
              <li><span className="font-medium">API:</span> RESTful API architecture</li>
              <li><span className="font-medium">UI Framework:</span> shadcn/ui component library</li>
              <li><span className="font-medium">Notifications:</span> Sonner toast notifications</li>
              <li><span className="font-medium">Authentication:</span> Not implemented (could be added with JWT)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Features & Capabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Dashboard</h3>
              <ul className="space-y-2 text-sm pl-5 list-disc">
                <li>Real-time sensor data display</li>
                <li>Device selection for focused monitoring</li>
                <li>Interactive data cards with visual indicators</li>
                <li>Historical data trends through line charts</li>
                <li>Automatic data refresh every 5 seconds</li>
                <li>Detailed device information panel</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Admin Console</h3>
              <ul className="space-y-2 text-sm pl-5 list-disc">
                <li>Device data submission form</li>
                <li>Random data generation for testing</li>
                <li>Device management interface</li>
                <li>Form validation and error handling</li>
                <li>Toast notifications for user feedback</li>
                <li>Responsive design for all screen sizes</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-muted">
            <h3 className="text-lg font-medium mb-4">Potential Future Enhancements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium">User Management</h4>
                <ul className="pl-5 list-disc space-y-1 mt-2">
                  <li>User authentication</li>
                  <li>Role-based access control</li>
                  <li>Multi-tenant support</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">Advanced Analytics</h4>
                <ul className="pl-5 list-disc space-y-1 mt-2">
                  <li>Predictive maintenance</li>
                  <li>Anomaly detection</li>
                  <li>Custom alerts & notifications</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium">Integration</h4>
                <ul className="pl-5 list-disc space-y-1 mt-2">
                  <li>WebSockets for true real-time</li>
                  <li>MQTT protocol support</li>
                  <li>API for external systems</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default About;
