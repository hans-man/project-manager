import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AppstoreOutlined,
  ProjectOutlined,
  BugOutlined,
  BarsOutlined,
  ReadOutlined,
  UserOutlined,
  HistoryOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  handleLogout: () => void;
  token: string | null;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, handleLogout, token }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { key: '1', icon: <HomeOutlined />, label: 'Home', path: '/' },
    { key: '2', icon: <AppstoreOutlined />, label: 'Kanban Board', path: '/board' },
    { key: '3', icon: <ProjectOutlined />, label: 'Projects', path: '/projects' },
    { key: '4', icon: <BugOutlined />, label: 'Issues', path: '/issues' },
    { key: '5', icon: <BarsOutlined />, label: 'Program List', path: '/program-list' },
    { key: '6', icon: <ReadOutlined />, label: 'Wiki', path: '/wiki' },
    { key: '7', icon: <UserOutlined />, label: 'Users', path: '/users' },
    { key: '8', icon: <HistoryOutlined />, label: 'Time Logs', path: '/timelogs' },
    { key: '9', icon: <CodeOutlined />, label: 'Instance Codes', path: '/instance-codes' },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={({ key }) => {
            const item = navItems.find(navItem => navItem.key === key);
            if (item) {
              navigate(item.path);
            }
          }}
          items={navItems.map(item => ({ key: item.key, icon: item.icon, label: item.label }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ float: 'right', marginRight: '16px' }}>
            {token && (
              <Button type="primary" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: '#fff',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

