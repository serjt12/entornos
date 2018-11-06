
import './App.css';
import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route,Link, Switch } from 'react-router-dom';
import actions from './actions'

import DeviceList from './devices_list';
import EntornoList from './entornos_list.js';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
//----------------------------
class App extends Component {

  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
//    console.log(collapsed);
    this.setState({ collapsed });
  }
  //--------------------
  

  render() {
    console.log(this.props)
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu key="sub1"
             title={ <Link to="/entornos"><span><Icon type="api" />
              <span>Entornos</span></span></Link>} >
              <Menu.Item key="3">Flores</Menu.Item>
              <Menu.Item key="4">Leguminosas</Menu.Item>
              <Menu.Item key="5">Maria</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<Link to="/devices"><span><Icon type="fork" /><span>Dispositivos</span></span></Link>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
           <Switch>
              <Route path="/devices" component={ AppBreadCrumb('dispositivos') } />
              <Route path="/entornos" component={ AppBreadCrumb('entornos') } />
            </Switch>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                <Route path="/devices" component={DeviceList} />
                <Route path="/entornos" component={EntornoList} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Laboratorios Humedos @2018 Upayacu
          </Footer>
        </Layout>
      </Layout>
    );
  }
}




  export default App

function AppBreadCrumb (text) {

  return () => (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{text}</Breadcrumb.Item>
      <Breadcrumb.Item></Breadcrumb.Item>
    </Breadcrumb>
  )
}
