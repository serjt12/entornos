import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Layout, Menu } from 'antd'
import { Route, Link, Switch } from 'react-router-dom'
import actions from '../actions'
/* components */
import SideMenu from './SideMenu'
import ViewRouter from './viewRouter'
import '../App.css'
const { Header, Content, Footer } = Layout

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //    collapsed: false,
    }
  }
  // lifecycle
  componentWillMount() {
    console.log('will', this.props)
    //    this.props.dispatch(actions.fetchDevices())
    this.props.fetchDevices()
    this.props.fetchEnvironms()

  }

  componentDidMount() {
    console.log('mounted layoyt', this.props)

  }
  // pass callback as props
  onMenuClick = (e) => {
    /*  const { item, key, keyPath } = e
    const root_add = e.keyPath
    item.onClick( e => {
    })*/
    // e.domEvent.preventDefault()
    e.domEvent.stopPropagation()
    console.log('props clicked event', e)
    e.domEvent.isDefaultPrevented ?  this.props.history.push(e.key) : console.log('PRRRRR');
  }

  render() {
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu onMenuClick={this.onMenuClick}/>
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

function mapDispatchToProps(dispatch) {
  const { fetchDevices, fetchEnvironms } = actions
  return bindActionCreators({ fetchDevices, fetchEnvironms }, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps)(App);
