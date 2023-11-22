// Sidebar.js
import React, { useState } from 'react';
import { Layout, Menu, Space, Tooltip } from 'antd';
import { UserOutlined, LogoutOutlined, BarChartOutlined, LineChartOutlined, AreaChartOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const { Sider } = Layout;

const Sidebar = ({ onLogout, showDailyModal }) => {


  return (
    <Sider width={100} collapsible trigger={null} style={{ backgroundColor: '#001529', height: '100%' }}>
      <Space direction="vertical" style={{ width: '100%', textAlign: 'center', marginTop: 20, height: '100%' }}>

        <Menu theme="dark" mode="vertical" selectable={false} inlineIndent={24} style={{ width: '100%', height: '100vh' }}>
          <Tooltip title="Dashboard">
            <Link to={'/Home'}>
            <Menu.Item icon={<HomeOutlined />} style={{ marginTop: 20 }} />
            </Link>
          </Tooltip>
          <Tooltip title="Monthly Chart">
            <Menu.Item key="3" icon={<BarChartOutlined />} style={{ marginTop: 20 }} />
          </Tooltip>
          <Tooltip title="Weekly Chart">
            <Menu.Item key="4" icon={<LineChartOutlined />} />
          </Tooltip>
          <Tooltip title="Daily Update">
            <Menu.Item onClick={showDailyModal} key="5" icon={<AreaChartOutlined />} />
          </Tooltip>
          <Tooltip title="User Profile">
            <Link to={'profile'}>
              <Menu.Item key="2" icon={<UserOutlined />} />
            </Link>
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
