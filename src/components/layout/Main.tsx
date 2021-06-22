import { Link } from "react-router-dom";

import { Layout, Avatar, Menu } from 'antd';

import TreeSelect from '../TreeSelect/TreeSelect';

import { UserOutlined, SettingFilled, EyeFilled } from '@ant-design/icons';

import Title from 'antd/lib/typography/Title';

const { Header, Sider, Content } = Layout;

type Props = {
  children: JSX.Element
}

function Main({ children }: Props) {
  return (
    <div className="App">
    <Layout>

      <Header style={{ padding: 10 }}>
        <Avatar style={{ float: 'right' }} icon={<UserOutlined />} />
        <Title style={{ color: 'white' }} level={3}>TRACTIAN SOFTWARE ENGINEER</Title>
      </Header>

      <Layout>
        <Sider style={{ paddingTop: 0 }}>
          <Menu
            // defaultSelectedKeys={['Dashboard']}
            mode="inline"
            theme="dark"
          >
            <TreeSelect />
            <Menu.Item key="Dashboard" icon={<EyeFilled />}>
              <Link to="/">Visão Geral</Link>
            </Menu.Item>
            <Menu.Item key="1" icon={<SettingFilled />}>
              <Link to="/actives">Ativos</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: 10 }}>
            <div style={{ background: '#ffffff', padding: 0, height: `100%`, maxWidth: `100%` }}>
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div >
  )
}

export default Main;