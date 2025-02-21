import React, { ReactNode, useEffect, useState } from 'react';
import { ConfigProvider, Layout, Menu } from 'antd';
import { CheckCircleOutlined, CloseOutlined, FileDoneOutlined, FileSearchOutlined, MoonOutlined, ProfileOutlined, ReconciliationOutlined, SettingOutlined, SunOutlined } from '@ant-design/icons';
import themeConfig from '../../theme/themeConfig'; // Adjust the import path as necessary
import type { MenuInfo } from 'rc-menu/lib/interface';

const { Sider, Content } = Layout;

interface SidebarLayoutProps {
    children: ReactNode;
    selectedKey: string;
    handleMenuClick: (e: MenuInfo) => void;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children, selectedKey, handleMenuClick }) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const currentThemeConfig = {
    ...themeConfig,
    algorithm: darkTheme ? themeConfig.algorithm : undefined, // Use darkAlgorithm or default
  };

  useEffect(() => {
    const handleMessage = (request: { url: string }, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void) => {
        setCurrentUrl(request.url);
        sendResponse({ success: true });
        return true; // Keep the message channel open for asynchronous response
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
        chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const isUpworkUrl = currentUrl.includes('upwork.com');

  return (
    <ConfigProvider theme={currentThemeConfig}>
      <Layout className='relative min-h-screen'>
        <Sider theme={darkTheme ? 'dark' : 'light'} width="20%" className='fixed right-0 top-0 h-screen rounded-r-lg'>
          <div className='p-2 text-lg text-center text-gray-50 mb-4'>
            UpwAI
          </div>
          <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" onClick={handleMenuClick} selectedKeys={[selectedKey]}>
              <Menu.Item key="1" title="Jobs Hunting"> <FileSearchOutlined /> </Menu.Item>
              <Menu.Item key="2" title="Proposal"> <FileDoneOutlined /> </Menu.Item>
              <Menu.Item key="3" title="Contacts"> <ReconciliationOutlined /> </Menu.Item>
              <Menu.Item key="4" title="Profile"> <ProfileOutlined /> </Menu.Item>
              {isUpworkUrl ? (
                <Menu.Item title="Tab Active is Upwork">
                  <CheckCircleOutlined className='text-green-500' />
                </Menu.Item>
              ) : (
                <Menu.Item title="Tab Active is not Upwork">
                  <CloseOutlined className='text-red-500' />
                </Menu.Item>
              )}
          </Menu>
          <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center', color: '#fff' }}>
            <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline">
              <Menu.Item key="5" title="Setting"> <SettingOutlined /> </Menu.Item>
              <Menu.Item onClick={toggleTheme}>
                {darkTheme ? <MoonOutlined /> : <SunOutlined />}         
              </Menu.Item>
            </Menu>
          </div>
        </Sider>
        <Layout style={{ width: '80%', height: '650px' }} className='absolute overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-screen border border-gray-700 rounded-lg'>
          <Content>
              {children}
          </Content>
        </Layout>
        
      </Layout>
    </ConfigProvider>
  );
};

export default SidebarLayout;