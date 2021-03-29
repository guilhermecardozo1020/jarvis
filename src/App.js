import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

export default function App() {

  const PrivateRoute = ({component: Component}) => {
    return <Route
      render = {(props => {
        let isAuthenticated = sessionStorage.getItem('uid')
        if (isAuthenticated) {
          return <Component {...props} />
        } else {
          return <Redirect to={{pathname: "/"}} />
        }
      })}
    />
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <PrivateRoute path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  )
}