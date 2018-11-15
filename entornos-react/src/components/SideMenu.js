import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, NavLink, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import '../App.css';
import '../styles/sider.css';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }
    this.renderDeviceList = this.renderDeviceList.bind(this);
  }

  /* control events */
  onCollapse = (collapsed) => {
    //    console.log(collapsed);
    this.setState({ collapsed });
  }

  onTitleClick = (e) => {
    console.log(`clicked: ${e.key}`, e);
    this.props.history.push(e.key);
    //    return <Redirect to={`${e.key}`} />
  }

  /* render helpers */ 
  renderDeviceList() {
    //console.log('deviceList', this.props);
    const { devices } = this.props
    return devices.map(device => (
      <Menu.Item key={device._id}>{device.name}</Menu.Item>
      ))
  }

  renderEnvironsList() {
    const { entornos } = this.props
    return entornos.map(entorno => (
      <Menu.Item key={entorno._id}>{entorno.name}</Menu.Item>
      ))
  }

  renderSider = () => {
    const { location } = this.props;
    console.log('sider props', location);
    return(
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
          <SubMenu 
            key="/entornos"
            title={ <Link to="/entornos"><span><Icon type="api" 
                />
                <span>Entornos</span></span></Link>} 
            onTitleClick={this.onTitleClick}
          >
            {this.renderEnvironsList()}
          </SubMenu>
          <SubMenu
            key="/devices"
            title={<Link to="/devices" ><span><Icon type="fork" /><span>Dispositivos</span></span></Link>}
            onTitleClick={this.onTitleClick}
          >
            {this.renderDeviceList()}
          </SubMenu>
        </Menu>
      </Sider>
    )
  }

  render() {
    console.log("location    ", this.props);
    return(
      <Router>
        <Route path="*" component={this.renderSider} />
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return{
    ...state 
  }
}


export default withRouter(connect(mapStateToProps)(SideMenu));
