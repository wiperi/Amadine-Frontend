import { Layout, Menu, Input, Avatar, ConfigProvider, Dropdown, MenuProps } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import '@/styles/global.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '@/assets/images/react-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setUserInfo } from '@/store/modules/userStore';
import { useState } from 'react';
import enUS from 'antd/locale/en_US';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const DashBoard: React.FC = () => {
  const siderTabs = [
    {
      key: '/home',
      icon: <HomeOutlined />,
      title: 'Home',
      path: 'home',
    },
    {
      key: '/quiz',
      icon: <SearchOutlined />,
      title: 'Quiz',
      path: 'quiz',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      title: 'Profile',
      path: 'profile',
    },
    {
      key: '/help',
      icon: <QuestionCircleOutlined />,
      title: 'Help',
      path: 'help',
    },
  ];

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setToken(''));
    dispatch(setUserInfo({}));
  };

  const items: MenuProps['items'] = [
    {
      label: <a href="#">Edit Profile</a>,
      key: '0',
    },
    {
      label: <a href="#">Preferences</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      ),
      key: '3',
    },
  ];

  const userInfo = useSelector((state: any) => state.user.userInfo);

  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const location = useLocation();

  return (
    <ConfigProvider theme={{ components: { Layout: {} } }} locale={enUS}>
      <Layout style={{ minHeight: '100vh' }}>
        {/* Header */}
        <Header className="fixed flex w-full items-center px-4">
          <div className="logo" style={{ marginRight: '16px', color: 'white' }}>
            <img src={logo} alt="logo" className="h-10 w-10" />
          </div>
          <Search
            placeholder="Search public content"
            style={{ flex: 1, maxWidth: '600px', margin: '0 auto' }}
          />
          <div style={{ marginLeft: 'auto' }}>
            <Dropdown menu={{ items }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()} className="flex items-center">
                <span style={{ color: 'white', marginRight: '8px' }}>{userInfo.name}</span>
                <Avatar icon={<UserOutlined />} />
              </a>
            </Dropdown>
          </div>
        </Header>

        {/* Body */}
        <Layout>
          {/* Sider */}
          <Sider
            onCollapse={(collapsed) => setSiderCollapsed(collapsed)}
            collapsible
            width={200}
            theme="light"
            className="fixed top-16 h-full shadow-lg"
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              style={{ height: '100%', borderRight: 0 }}
            >
              {siderTabs.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.title}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>

          {/* Content */}
          <Content
            style={{
              padding: '24px',
              minHeight: 280,
              marginTop: 64,
              marginLeft: siderCollapsed ? 80 : 200,
              transition: 'margin-left 0.3s',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default DashBoard;
