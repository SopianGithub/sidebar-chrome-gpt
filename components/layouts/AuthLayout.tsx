import React from 'react';
import { Layout, Form, Input, Button, Card, Row, Col } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const AuthLayout = () => {

  const handleGoogleSignIn = () => {
    chrome.windows.create({
        url: 'http://localhost:3000/google-signin',
        type: 'popup',
        width: 600,
        height: 800,
        left: (window.screen.width / 2) - (600 / 2),
        top: (window.screen.height / 2) - (800 / 2),
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#007bff', color: '#fff', textAlign: 'center', fontSize: '24px' }}>
        My App
      </Header>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Row justify="center" style={{ width: '100%' }}>
          <Col xs={22} sm={16} md={12} lg={8}>
            <Card
              title="Sign In"
              bordered={false}
              style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
            >
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={(values) => console.log('Form values:', values)}
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Log in
                  </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="default" icon={<GoogleOutlined />} block onClick={handleGoogleSignIn}>
                        Sign in with Google
                    </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>My App ©2023</Footer>
    </Layout>
  );
};

export default AuthLayout;