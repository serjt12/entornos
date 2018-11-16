
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route,Link, Switch } from 'react-router-dom'
import App from './components/App'

//----------------------------
class AppRouter extends Component {
  render() {
    //  console.log(this.props)
    return (
      <Router forceRefresh={true}>
          <Route path="/" component={App} />
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return { 
    user: state.user 
  };
}

export default connect(mapStateToProps)(AppRouter)

