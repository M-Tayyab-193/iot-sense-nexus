
import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Help: React.FC = () => {
  const faqs = [
    {
      question: 'How do I add a new IoT device?',
      answer: 'Go to the Admin Console, select the "Manage Devices" tab, and fill out the device form with all required information. Each device must have a unique deviceId.'
    },
    {
      question: 'How often is the data updated?',
      answer: 'The dashboard automatically polls for new data every 5 seconds. You can also manually submit new data through the Admin Console.'
    },
    {
      question: 'What should I do if a device is not showing data?',
      answer: 'First, check if the device is marked as active in the Device Info page. Then, ensure data has been submitted for that device through the Admin Console. If problems persist, check your network connectivity.'
    },
    {
      question: 'Can I export the device data?',
      answer: 'Currently, data export functionality is not available. This feature will be added in a future update.'
    },
    {
      question: 'How do I update a device\'s information?',
      answer: 'Currently, you can only add new devices. The ability to update existing devices will be added in a future release.'
    },
    {
      question: 'What do the different sensor readings mean?',
      answer: 'Temperature is measured in °C, humidity and water level in percentage, light intensity in lux, motion detected is a boolean value, and battery level is shown as a percentage.'
    },
  ];

  return (
    <div className="p-6 animate-fade-in">
      <Helmet>
        <title>Help | IoT Monitoring System</title>
      </Helmet>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Help & Documentation</h1>
        <p className="text-muted-foreground">
          Get assistance with using the IoT monitoring system
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
            <CardDescription>
              Essential steps to get started with the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">1. Add Devices</h3>
              <p className="text-sm text-muted-foreground">
                Navigate to the Admin Console and add your IoT devices with their unique identifiers.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">2. Submit Data</h3>
              <p className="text-sm text-muted-foreground">
                Use the Admin Console to submit sensor data for your devices, either manually or using the random data generator.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">3. View Dashboard</h3>
              <p className="text-sm text-muted-foreground">
                Return to the Dashboard to view real-time data and historical trends for your selected device.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">4. Manage Devices</h3>
              <p className="text-sm text-muted-foreground">
                Check the Device Info page to see all registered devices and their status.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Technical details about the IoT monitoring platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Backend</h3>
              <p className="text-sm text-muted-foreground">
                Node.js with Express, connected to MongoDB Atlas for data storage.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Frontend</h3>
              <p className="text-sm text-muted-foreground">
                React with TypeScript, using Context API for state management.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Data Refresh</h3>
              <p className="text-sm text-muted-foreground">
                Automatic polling every 5 seconds for real-time updates.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Visualization</h3>
              <p className="text-sm text-muted-foreground">
                Interactive charts using Recharts library for data visualization.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
