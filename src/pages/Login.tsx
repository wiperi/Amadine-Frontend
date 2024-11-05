import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Layout, message } from 'antd';
import '@/styles/global.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRegisterApi, fetchLoginApi } from '@/store/modules/userStore';
import { AxiosError } from 'axios';
const { Content } = Layout;

type FieldType = {
  email?: string;
  name?: string;
  password?: string;
  remember?: string;
  firstName?: string;
  lastName?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishLogin: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await dispatch(fetchLoginApi(values.email as string, values.password as string));
      message.success('Login successful');
      navigate('/home');
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        message.error(error.response?.data?.error);
      } else {
        message.error('Failed to login');
      }
    }
  };

  const onFinishRegister: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    try {
      await dispatch(
        fetchRegisterApi(
          values.email as string,
          values.password as string,
          values.firstName as string,
          values.lastName as string
        )
      );
      message.success('Register successful');
      navigate('/');
    } catch (error: any) {
      message.error(error.response.data.error);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [isRegister, setIsRegister] = useState(false);

  return (
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
          <h1 style={{ textAlign: 'center', marginBottom: 24 }}>
            {isRegister ? 'Register' : 'Login'}
          </h1>

          {/* Login Form */}
          <Form
            name="loginForm"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600, display: isRegister ? 'none' : 'block' }}
            initialValues={{ remember: true }}
            onFinish={onFinishLogin}
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

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                {
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must be at least 8 characters long and contain at least 1 letter, 1 number',
                },
              ]}
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
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>

          {/* Register From */}
          <Form
            name="registerForm"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600, display: isRegister ? 'block' : 'none' }}
            initialValues={{ remember: true }}
            onFinish={onFinishRegister}
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
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>

          {/* Register and Forgot Password button */}
          <Button
            type="link"
            style={{ marginLeft: '5rem' }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login' : 'Register'}
          </Button>
          <Button type="link">Forgot Password?</Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
