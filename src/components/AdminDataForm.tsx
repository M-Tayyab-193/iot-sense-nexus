
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { useDeviceContext } from '@/context/DeviceContext';
import { toast } from 'sonner';

const AdminDataForm: React.FC = () => {
  const { devices, addDeviceData } = useDeviceContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    deviceId: '',
    temperature: 22,
    humidity: 50,
    waterLevel: 75,
    lightIntensity: 500,
    motionDetected: false,
    batteryLevel: 100
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSliderChange = (name: string) => (value: number[]) => {
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
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        waterLevel: Number(formData.waterLevel),
        lightIntensity: Number(formData.lightIntensity),
        batteryLevel: Number(formData.batteryLevel)
      });
      
      if (success) {
        toast.success('Device data submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="card-gradient max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle>Submit Device Data</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="deviceId">Device*</Label>
            <select
              id="deviceId"
              name="deviceId"
              value={formData.deviceId}
              onChange={handleChange}
              required
              className="w-full bg-muted/50 border border-input rounded-md h-9 px-3"
            >
              <option value="">Select a device...</option>
              {devices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.name} ({device.deviceId})
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="temperature">
              Temperature: {formData.temperature}°C
            </Label>
            <Slider
              id="temperature"
              min={-10}
              max={50}
              step={0.1}
              value={[formData.temperature]}
              onValueChange={handleSliderChange('temperature')}
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="humidity">
              Humidity: {formData.humidity}%
            </Label>
            <Slider
              id="humidity"
              min={0}
              max={100}
              step={1}
              value={[formData.humidity]}
              onValueChange={handleSliderChange('humidity')}
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="waterLevel">
              Water Level: {formData.waterLevel}%
            </Label>
            <Slider
              id="waterLevel"
              min={0}
              max={100}
              step={1}
              value={[formData.waterLevel]}
              onValueChange={handleSliderChange('waterLevel')}
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lightIntensity">
              Light Intensity: {formData.lightIntensity} lux
            </Label>
            <Slider
              id="lightIntensity"
              min={0}
              max={2000}
              step={10}
              value={[formData.lightIntensity]}
              onValueChange={handleSliderChange('lightIntensity')}
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="batteryLevel">
              Battery Level: {formData.batteryLevel}%
            </Label>
            <Slider
              id="batteryLevel"
              min={0}
              max={100}
              step={1}
              value={[formData.batteryLevel]}
              onValueChange={handleSliderChange('batteryLevel')}
              className="py-4"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Switch
              id="motionDetected"
              checked={formData.motionDetected}
              onCheckedChange={(checked) => handleSwitchChange('motionDetected', checked)}
            />
            <Label htmlFor="motionDetected">Motion Detected</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
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
