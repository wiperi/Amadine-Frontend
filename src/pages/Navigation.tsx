import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, PlusCircleOutlined, CommentOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

const { Header } = Layout;

export const Navigation: React.FC = () => {
  return (
    <Layout className="layout">
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusCircleOutlined />}>
            <Link to="/counter">Counter</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<CommentOutlined />}>
            <Link to="/comment">Comments</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<AppstoreOutlined />}>
            <Link to="/app">App</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

