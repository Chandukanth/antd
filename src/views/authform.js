// AuthForm.js
import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, Tooltip, message, Layout } from 'antd';
import { MailOutlined, LockOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Sidebar from './sidebar'

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggle = () => {
    setIsSignup(!isSignup);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    message.success('Logout successful!');
  };

  const handleSubmit = (values) => {
    if (isSignup) {
      localStorage.setItem('userEmail', values.email);
      localStorage.setItem('userPassword', values.password);
      message.success('Sign Up Successful!');
    } else {
      const storedEmail = localStorage.getItem('userEmail');
      const storedPassword = localStorage.getItem('userPassword');
      if (values.email === storedEmail && values.password === storedPassword) {
        handleLogin();
      } else {
        message.error('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <Layout>
      {!isLoggedIn ? (
        <Card style={{ width: 600, margin: 'auto', marginTop: 100, padding: 20, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Title level={2} style={{ marginBottom: 20, textAlign: 'center', color: '#1890ff' }}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Title>
          <Form onFinish={handleSubmit}>
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            {isSignup && (
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                rules={[{ required: true, message: 'Please confirm your password' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
              </Form.Item>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
                {isSignup ? 'Sign Up' : 'Sign In'}
              </Button>
            </Form.Item>
            <Form.Item>
              <Space>
                Or
                <Tooltip title={isSignup ? 'Switch to Sign In' : 'Switch to Sign Up'}>
                  <Button type="link" onClick={handleToggle} style={{ color: '#1890ff' }}>
                    {isSignup ? 'Sign In' : 'Sign Up'}
                  </Button>
                </Tooltip>
              </Space>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center', marginTop: 10 }}>
            <Text type="secondary">
              <InfoCircleOutlined /> Use a valid email and a strong password.
            </Text>
          </div>
        </Card>
      ) : (
        <Layout style={{ height: '100%' }}>
          <Sidebar onLogout={handleLogout} />
          <Layout>
            <Header style={{ backgroundColor: '#fff', padding: 10 }}>
              <Space>
                <Text strong>Welcome, User!</Text>
                <span role="img" aria-label="Happy Face" style={{ fontSize: 24 }}>
                  😄
                </span>
              </Space>
            </Header>
            <Content style={{ padding: 24 }}>
              {/* Your main content goes here */}
              <div>Main Content</div>
            </Content>
          </Layout>
        </Layout>
      )}
    </Layout>
  );
};

export default AuthForm;
