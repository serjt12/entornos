import React,{ Component } from 'react'
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Icon } from 'antd'
import actions from '../actions'

import '../App.css'
import '../styles/sider.css'
const { Sider } = Layout
const SubMenu = Menu.SubMenu

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    }
    this.renderDeviceList = this.renderDeviceList.bind(this)
  }

  componentDidMount() {
    //const { collapsed } = this.state
    //    console.log('state  ', actions.collapsed, 'props', this.props.collapsed)
    //    this.props.dispatch(actions.collapsed(this.state.collapsed))
  }

  /* control events */
  onCollapse = (collapsed) => {
    console.log('ON COLLAPSE', collapsed)
    this.props.dispatch(actions.collapsed(collapsed))
    this.setState({ collapsed })
  }

  onTitleClick = (e) => {
    console.log(`clicked: ${e.key}`, e)
    //const path = e.key 
    //    this.props.history.replace(path)
  }

  /* render helpers */ 
  renderDeviceList() {
    //console.log('deviceList', this.props);
    const { devices } = this.props
    return devices.map(device => {
      const address = `/devices/${device.name}`
      return <Menu.Item key={address} onClick={this.props.onMenuClick}><Link to={address}><span>{device.name}</span></Link></Menu.Item>
    })
  }

  renderEnvironsList() {
    const { entornos } = this.props
    return entornos.map(entorno => {
      const address = `/entornos/${entorno.name}`
      return <Menu.Item key={address} onClick={this.props.onMenuClick}><Link to={address}><span>{entorno.name}</span></Link></Menu.Item>
      })
  }

  renderSider = () => {
    const { location } = this.props
    // console.log('sider props', this.props)
    return(
      <Sider
        collapsible
        collapsed={this.props.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
          <SubMenu 
            key="/sub1"
            title={ <Link to="/entornos"><span><Icon type="api"/><span>Entornos</span></span></Link>} 
          >
            <Menu.Item key="/entornos" onClick={this.props.onMenuClick}><Link to="/entornos"><span>all</span></Link></Menu.Item>
            {this.renderEnvironsList()}
          </SubMenu>
          <SubMenu
            key="/sub2"
            title={<a href='/'><Icon type="fork" /><span>Dispositivos</span></a>}
          >
            <Menu.Item key="/devices" onClick={this.props.onMenuClick}><Link to="/devices"><span>all</span></Link></Menu.Item>
            {this.renderDeviceList()}
          </SubMenu>
        </Menu>
      </Sider>
    )
  }

  render() {
    // console.log("REnder props    ", this.props)
    return(
      <Router>
        <Route path="/" component={this.renderSider} />
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return{
    ...state 
  }
}


export default withRouter(connect(mapStateToProps)(SideMenu))
