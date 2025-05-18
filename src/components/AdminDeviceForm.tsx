
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useDeviceContext } from '@/context/DeviceContext';
import { toast } from 'sonner';

const AdminDeviceForm: React.FC = () => {
  const { addDevice } = useDeviceContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    deviceId: '',
    name: '',
    type: '',
    location: '',
    active: true,
    ipAddress: '',
    firmwareVersion: '1.0.0'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.deviceId || !formData.name) {
      toast.error('Please fill all required fields');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const success = await addDevice({
        ...formData,
        installDate: new Date().toISOString(),
        lastMaintenance: new Date().toISOString()
      });
      
      if (success) {
        // Reset form after successful submission
        setFormData({
          deviceId: '',
          name: '',
          type: '',
          location: '',
          active: true,
          ipAddress: '',
          firmwareVersion: '1.0.0'
        });
        toast.success('Device added successfully');
      }
    } catch (error) {
      console.error('Error submitting device:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="max-w-3xl mx-auto card-gradient animate-fade-in">
      <CardHeader>
        <CardTitle>Add New Device</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="deviceId">Device ID*</Label>
              <Input
                id="deviceId"
                name="deviceId"
                value={formData.deviceId}
                onChange={handleChange}
                placeholder="e.g., device-002"
                required
                className="bg-muted/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Kitchen Sensor"
                required
                className="bg-muted/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type*</Label>
              <Input
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="e.g., multi-sensor"
                required
                className="bg-muted/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location*</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Kitchen"
                required
                className="bg-muted/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ipAddress">IP Address</Label>
              <Input
                id="ipAddress"
                name="ipAddress"
                value={formData.ipAddress}
                onChange={handleChange}
                placeholder="e.g., 192.168.1.101"
                className="bg-muted/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="firmwareVersion">Firmware Version</Label>
              <Input
                id="firmwareVersion"
                name="firmwareVersion"
                value={formData.firmwareVersion}
                onChange={handleChange}
                placeholder="e.g., 1.0.0"
                className="bg-muted/50"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 pt-2">
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => handleSwitchChange('active', checked)}
            />
            <Label htmlFor="active">Device Active</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-iot-purple hover:bg-iot-purple/80"
          >
            {isSubmitting ? 'Adding...' : 'Add Device'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AdminDeviceForm;
