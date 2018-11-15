import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import DeviceList from './devices_list'
import EntornoList from './entornos_list.js';


function ViewRouter() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/devices' component={AppBreadCrumb('dispositivos')} />
          <Route path='/entornos' component={AppBreadCrumb('entornos')} />
        </Switch>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Switch>
            <Route path="/devices" component={DeviceList} />
            <Route path="/entornos" component={EntornoList} />
          </Switch>
        </div>
      </div>
    </Router>
    )
}
//-----
function AppBreadCrumb (text) {

  return () => (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{text}</Breadcrumb.Item>
      <Breadcrumb.Item></Breadcrumb.Item>
    </Breadcrumb>
    )
}

export default ViewRouter;
