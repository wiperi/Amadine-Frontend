import React, { useState } from 'react';
import { Layout, Menu, Input, Avatar, Button } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import '../styles/global.scss';
import { Link, Outlet } from 'react-router-dom';
import { Counter } from './Counter';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const DashBoard: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', padding: '0 16px'}}>
        <div className="logo" style={{ marginRight: '16px', color: 'white' }}>
          Logo
        </div>
        <Search
          placeholder="Search public content"
          style={{ flex: 1, maxWidth: '600px', marginLeft: '500px' }}
        />
        <div style={{ marginLeft: 'auto' }}>
          <Button type="primary" style={{ marginRight: '8px' }}>
            Create
          </Button>
          <Avatar icon={<UserOutlined />} />
        </div>
      </Header>
      <Layout>
        <Sider width={200} theme="light">
          <Menu
            mode="inline"
            defaultSelectedKeys={['home']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="home">Home</Link>
            </Menu.Item>
            <Menu.Item key="quiz" icon={<SearchOutlined />}>
              <Link to="quiz">Quiz</Link>
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              <Link to="profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="help" icon={<QuestionCircleOutlined />} style={{ marginTop: 'auto' }}>
              <Link to="help">Help</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '24px', minHeight: 280 }}>
          {/* {renderContent()} */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
