import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import '../App.css';
import SideMenu from './Sider'
import Home from './Home'
import EntornoList from './EntornoList';
import DeviceList from './DeviceList';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
      <Router>
        <SideMenu />
        <Layout>
          <Layout style={{ minHeight: '100vh' }}>
          <Content style={{ position: 'absolute', left: 'calc(80px - 100%)' }}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/entornos" component={EntornoList} />
                <Route path="/devices" component={DeviceList} />
              </Switch>
            </Content>
          </Layout>
        <Footer style={{ textAlign: 'center' }} >Laboratorios Humedos @2018 Upayacu</Footer>
        </Layout>
      </Router>
  );
}

export default App;
