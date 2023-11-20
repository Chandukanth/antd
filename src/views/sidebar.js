// Sidebar.js
import React, { useState } from 'react';
import { Layout, Menu, Space, Tooltip } from 'antd';
import { UserOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider width={200} collapsible collapsed={collapsed} trigger={null} style={{ backgroundColor: '#001529', height: '100%' }}>
      <Space direction="vertical" style={{ width: '100%', textAlign: 'center', marginTop: 20 }}>
        {collapsed ? (
          <Tooltip title="Expand Sidebar">
            <MenuUnfoldOutlined onClick={handleToggleCollapse} style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} />
          </Tooltip>
        ) : (
          <Tooltip title="Collapse Sidebar">
            <MenuFoldOutlined onClick={handleToggleCollapse} style={{ fontSize: 20, color: '#fff', cursor: 'pointer' }} />
          </Tooltip>
        )}
        <Menu theme="dark" mode="vertical" selectable={false} inlineIndent={24} style={{ width: '100%' }}>
          <Tooltip title="User Profile">
            <Menu.Item key="2" icon={<UserOutlined />} style={{ marginTop: 'auto' }} />
          </Tooltip>
          <Tooltip title="Logout">
            <Menu.Item key="1" onClick={onLogout} icon={<LogoutOutlined />} style={{ marginBottom: 'auto' }} />
          </Tooltip>
        </Menu>
      </Space>
    </Sider>
  );
};

export default Sidebar;
