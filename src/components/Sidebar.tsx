
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  FileText,
  CircleHelp,
  Info
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/', 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      name: 'Admin', 
      path: '/admin', 
      icon: <Settings size={20} /> 
    },
    { 
      name: 'Device Info', 
      path: '/device-info', 
      icon: <FileText size={20} /> 
    },
    { 
      name: 'Help', 
      path: '/help', 
      icon: <CircleHelp size={20} /> 
    },
    { 
      name: 'About', 
      path: '/about', 
      icon: <Info size={20} /> 
    }
  ];
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar relative transition-all duration-300 flex flex-col border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "")}>
          <div className="h-8 w-8 rounded-full bg-iot-purple animate-pulse-subtle"></div>
          {!collapsed && (
            <span className="ml-2 text-lg font-semibold text-white">IoT Monitor</span>
          )}
        </div>
        <button 
          onClick={toggleSidebar} 
          className={cn(
            "rounded-full p-1 hover:bg-iot-purple/20 transition-colors",
            collapsed && "absolute -right-3 top-5 bg-sidebar border border-sidebar-border"
          )}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      <nav className="flex-grow py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-white transition-colors relative",
                  location.pathname === item.path && "bg-sidebar-accent text-white sidebar-highlight",
                  collapsed && "justify-center px-2"
                )}
              >
                <span className="text-iot-purple">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "")}>
          <div className="h-6 w-6 rounded-full bg-green-500"></div>
          {!collapsed && <span className="ml-2 text-sm">System Online</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
