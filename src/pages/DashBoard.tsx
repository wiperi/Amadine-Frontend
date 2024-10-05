import { Layout, Menu, Input, Avatar, Button, ConfigProvider, theme, Modal } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import '@/styles/global.css';
import { Link, Outlet } from 'react-router-dom';
import logo from '@/assets/images/react-logo.png';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const DashBoard: React.FC = () => {
  const siderTabs = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      title: 'Home',
      path: 'home',
    },
    {
      key: 'quiz',
      icon: <SearchOutlined />,
      title: 'Quiz',
      path: 'quiz',
    },
    {
      key: 'profile',
      icon: <UserOutlined />,
      title: 'Profile',
      path: 'profile',
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      title: 'Help',
      path: 'help',
    },
  ];

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <div className="logo" style={{ marginRight: '16px', color: 'white' }}>
            <img src={logo} alt="logo" className="h-10 w-10" />
          </div>
          <Search
            placeholder="Search public content"
            style={{ flex: 1, maxWidth: '600px', margin: '0 auto' }}
          />
          <div style={{ marginLeft: 'auto' }}>
            <Button type="primary" style={{ marginRight: '8px' }}>
              Create
            </Button>
            <Avatar icon={<UserOutlined />} />
          </div>
        </Header>
        <Layout>
          <Sider collapsible width={200} theme="light">
            <Menu
              mode="inline"
              defaultSelectedKeys={['home']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {siderTabs.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={item.path}>{item.title}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
          <Content style={{ padding: '24px', minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      <Modal
        open={true}
        footer={null}
        closable={false}
        centered
        width={400}
        bodyStyle={{ padding: '24px' }}
      ></Modal>
    </ConfigProvider>
  );
};

export default DashBoard;
