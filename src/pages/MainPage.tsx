import React, { useState } from 'react';
import { Layout, Menu, Input, Avatar, Button } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import '../styles/global.scss';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

export const MainPage: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('home');

  const handleMenuClick = (key: string) => {
    setSelectedMenuItem(key);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'home':
        return <h1>Hello World</h1>;
      case 'discover':
        return <h1>Discover Page</h1>;
      case 'library':
        return <h1>Library Page</h1>;
      default:
        return <h1>Hello World</h1>;
    }
  };

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
            onSelect={({ key }) => handleMenuClick(key as string)}
          >
            <Menu.Item key="home" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="discover" icon={<SearchOutlined />}>
              Discover
            </Menu.Item>
            <Menu.Item key="library" icon={<UserOutlined />}>
              Library
            </Menu.Item>
            <Menu.Item key="help" icon={<QuestionCircleOutlined />} style={{ marginTop: 'auto' }}>
              Help
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '24px', minHeight: 280 }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};
