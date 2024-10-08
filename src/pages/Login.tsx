import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import '@/styles/global.css';

const { Content } = Layout;

type FieldType = {
  email?: string;
  name?: string;
  password?: string;
  remember?: string;
  firstName?: string;
  lastName?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login: React.FC = () => (
  <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
    <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          width: 400,
          padding: 24,
          backgroundColor: 'white',
          borderRadius: 4,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Login</h1>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="Name">
            <Input.Group compact>
              <Form.Item
                name="firstName"
                noStyle
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input style={{ width: '50%' }} placeholder="First Name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                noStyle
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input style={{ width: '50%' }} placeholder="Last Name" />
              </Form.Item>
            </Input.Group>
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 6, span: 24 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 24 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: '2rem' }}>
              Login
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 24 }}>
            <a style={{ marginRight: '4rem' }} href="#">
              Register
            </a>
            <a href="#">Forgot Password?</a>
          </Form.Item>
        </Form>
      </div>
    </Content>
  </Layout>
);

export default Login;
