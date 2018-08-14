import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../components/Header/Header'
import Root from '../components/Root/Root'

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/" component={Root} />
          </Switch>
        </Router>
      </div>
    )
  }
}
