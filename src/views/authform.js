// AuthForm.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, Tooltip, message, Layout } from 'antd';
import { MailOutlined, LockOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cardWidth, setCardWidth] = useState('50%');
  const navigation = useNavigate()
  const handleToggle = () => {
    setIsSignup(!isSignup);
  };

  const handleLogin = () => {
    navigation('/Home')
    message.success('Login Successful 😄');
  };


  useEffect(() => {
    const handleResize = () => {
      // Adjust the width based on the window width
      const width = window.innerWidth > 768 ? '50%' : '90%';
      setCardWidth(width);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial call to set the initial width
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleSubmit = (values) => {
    if (isSignup) {
      localStorage.setItem('userEmail', values.email);
      localStorage.setItem('userPassword', values.password);
      localStorage.setItem('user', values.name);

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

      <Card style={{ width: cardWidth, margin: 'auto', marginTop: 100, padding: 20, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Title level={2} style={{ marginBottom: 20, textAlign: 'center', color: '#1890ff' }}>
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Title>
        <Form onFinish={handleSubmit}>
          {isSignup && (
            <Form.Item name="name" label="UserName" rules={[{ required: true, type: 'name', message: 'Please enter a name' }]}>
              <Input prefix={<UserOutlined />} placeholder="Full name" />
            </Form.Item>
          )}
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          {isSignup && (
            <>
              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                rules={[{ required: true, message: 'Please confirm your password' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
              </Form.Item>


            </>
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



    </Layout>
  );
};

export default AuthForm;
