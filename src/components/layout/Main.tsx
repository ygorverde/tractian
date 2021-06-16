import { Link } from "react-router-dom";

import { Layout, Avatar, Menu } from 'antd';

import TreeSelect from '../TreeSelect/TreeSelect';

// import TreeSelect2 from '../TreeSelect/TreeSelect2';

import { UserOutlined, SettingFilled, EyeFilled } from '@ant-design/icons';

import Title from 'antd/lib/typography/Title';

const { Header, Footer, Sider, Content } = Layout;

type Props = {
  children: JSX.Element
}

function Main({ children }: Props) {
  return (
    <div className="App">
    <Layout>

      <Header style={{ padding: 10 }}>
        <Avatar style={{ float: 'right' }} icon={<UserOutlined />} />
        <Title style={{ color: 'white' }} level={3}>TRACTIAN SOFTWARE ENGENHARIA</Title>
      </Header>

      <Layout>
        <Sider style={{ paddingTop: 0 }}>
          <Menu
            defaultSelectedKeys={['Dashboard']}
            mode="inline"
            theme="dark"
          >
            {/* <TreeSelect /> */}
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
          <Content style={{ padding: '10px' }}>
            <div style={{ background: '#fff', padding: 10, minHeight: 580 }}>
              {children}
            </div>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  </div >
  )
}

export default Main;