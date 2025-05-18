
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useDeviceContext } from '@/context/DeviceContext';
import { toast } from 'sonner';

const AdminDataForm: React.FC = () => {
  const { devices, addDeviceData } = useDeviceContext();
  const [formData, setFormData] = useState({
    deviceId: '',
    temperature: 25,
    humidity: 50,
    waterLevel: 75,
    lightIntensity: 800,
    motionDetected: false,
    batteryLevel: 90,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Set the first device as default if available
    if (devices.length > 0 && !formData.deviceId) {
      setFormData(prev => ({ ...prev, deviceId: devices[0].deviceId }));
    }
  }, [devices]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.deviceId) {
      toast.error('Please select a device');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const success = await addDeviceData({
        ...formData,
        timestamp: new Date().toISOString()
      });
      
      if (success) {
        toast.success('Data submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const generateRandomData = () => {
    setFormData(prev => ({
      ...prev,
      temperature: Math.round((Math.random() * 30 + 10) * 10) / 10, // 10-40°C
      humidity: Math.round(Math.random() * 100), // 0-100%
      waterLevel: Math.round(Math.random() * 100), // 0-100%
      lightIntensity: Math.round(Math.random() * 1500 + 100), // 100-1600 lux
      motionDetected: Math.random() > 0.5, // Random boolean
      batteryLevel: Math.round(Math.random() * 40 + 60), // 60-100%
    }));
    
    toast('Random data generated', {
      description: 'You can now submit this data',
    });
  };
  
  return (
    <Card className="max-w-3xl mx-auto card-gradient animate-fade-in">
      <CardHeader>
        <CardTitle>Add Device Data</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="deviceId">Device</Label>
            <select
              id="deviceId"
              name="deviceId"
              value={formData.deviceId}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2"
              required
            >
              <option value="">Select a device</option>
              {devices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.name} ({device.location})
                </option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <span className="text-sm font-medium">{formData.temperature}°C</span>
                </div>
                <Slider
                  id="temperature"
                  min={-10}
                  max={50}
                  step={0.5}
                  value={[formData.temperature]}
                  onValueChange={(value) => handleSliderChange('temperature', value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="humidity">Humidity (%)</Label>
                  <span className="text-sm font-medium">{formData.humidity}%</span>
                </div>
                <Slider
                  id="humidity"
                  min={0}
                  max={100}
                  step={1}
                  value={[formData.humidity]}
                  onValueChange={(value) => handleSliderChange('humidity', value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="waterLevel">Water Level (%)</Label>
                  <span className="text-sm font-medium">{formData.waterLevel}%</span>
                </div>
                <Slider
                  id="waterLevel"
                  min={0}
                  max={100}
                  step={1}
                  value={[formData.waterLevel]}
                  onValueChange={(value) => handleSliderChange('waterLevel', value)}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="lightIntensity">Light Intensity (lux)</Label>
                  <span className="text-sm font-medium">{formData.lightIntensity} lux</span>
                </div>
                <Slider
                  id="lightIntensity"
                  min={0}
                  max={2000}
                  step={10}
                  value={[formData.lightIntensity]}
                  onValueChange={(value) => handleSliderChange('lightIntensity', value)}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="batteryLevel">Battery Level (%)</Label>
                  <span className="text-sm font-medium">{formData.batteryLevel}%</span>
                </div>
                <Slider
                  id="batteryLevel"
                  min={0}
                  max={100}
                  step={1}
                  value={[formData.batteryLevel]}
                  onValueChange={(value) => handleSliderChange('batteryLevel', value)}
                />
              </div>
              
              <div className="flex items-center space-x-4 pt-4">
                <Switch
                  id="motionDetected"
                  checked={formData.motionDetected}
                  onCheckedChange={(checked) => handleSwitchChange('motionDetected', checked)}
                />
                <Label htmlFor="motionDetected">Motion Detected</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={generateRandomData}
          >
            Generate Random Data
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || !formData.deviceId}
            className="bg-iot-purple hover:bg-iot-purple/80"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Data'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AdminDataForm;
