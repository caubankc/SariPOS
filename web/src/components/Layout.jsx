import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    UserSwitchOutlined,
    MoneyCollectOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { useState } from 'react';
  import './layout.css';
  import { Link } from 'react-router-dom';
  
  const { Header, Sider, Content } = Layout;
  
  const AppLayout = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
  
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h2 className="logo-title">Sari PoS</h2>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}>
              <Menu.Item key="/" icon={<HomeOutlined/>}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="/orders" icon={<MoneyCollectOutlined/>}>
                <Link to="/orders">Orders</Link>
              </Menu.Item>
              <Menu.Item key="/products" icon={<HomeOutlined/>}>
                <Link to="/products">Products</Link>
              </Menu.Item>
              <Menu.Item key="/customers" icon={<UserSwitchOutlined/>}>
                <Link to="/customers">Customers</Link>
              </Menu.Item>
              <Menu.Item key="" icon={<LogoutOutlined/>}>
                <Link to="/logout">Logout</Link>
              </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default AppLayout;