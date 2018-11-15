import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route, Link, Switch } from 'react-router-dom';
import actions from '../actions';
/* components */
import SideMenu from './SideMenu';
import ViewRouter from './viewRouter';
import DeviceList from './devices_list';
import EntornoList from './entornos_list.js';
import '../App.css';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //    collapsed: false,
    }

  }
  // lifecycle
  componentWillMount() {
    console.log('will', this.props);

  }

  componentDidMount() {
    console.log('mounted layoyt', this.props);

  }

  render() {
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <ViewRouter />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Laboratorios Humedos @2018 Upayacu
          </Footer>
        </Layout>
      </Layout>
      );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }

}

export default connect (mapStateToProps)(App);
