import React, { ReactNode, useEffect, useState } from 'react';
import Auth, { useAuth } from '../components/Auth';
import SidebarLayout from '../components/layouts/SidebarLayout';
import type { MenuInfo } from 'rc-menu/lib/interface';
import HuntingJobs from '../components/ui/sidepanel/Hunting';

interface SidePanelProps {
  children: ReactNode;
}

const SidePanel: React.FC<SidePanelProps> = () => {
  const { session } = useAuth(); // Access session data

  const [selectedKey, setSelectedKey] = useState<string>('1');

  const handleMenuClick = (e: MenuInfo) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <HuntingJobs/>;
      case '2':
        return <div>Proposal Content</div>;
      case '3':
        return <div>Contacts Content</div>;
      case '4':
        return <div>Profile Content</div>;
      case '5':
        return <div>Settings Content</div>;
      default:
        return <div>Welcome</div>;
    }
  };

  useEffect(() => {
    // Initialize or fetch data if necessary
    console.log("Session Data:", session); // Example usage of session data
  }, [session]);

  return (
    <Auth>
      <SidebarLayout handleMenuClick={handleMenuClick} selectedKey={selectedKey} >
        {renderContent()}
      </SidebarLayout>
    </Auth>
  );
};

export default SidePanel;