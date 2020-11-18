import React from 'react'
import AuthorizationScreen from './AuthorizationScreen'
import RegistrationScreen from './RegistrationScreen'
import MainPage from './MainPage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFound from './NotFound';
import LoginScreen from './LoginScreen'
import ProfilePage from './ProfilePage'
import PrivateRoute from './PrivateRoute'
import './App.css'

function App() {
    return (
        <div>
        <Router>
            <Switch>
                <Route path='/login' component={LoginScreen} />
                <Route path='/sign_up' component={RegistrationScreen} />
                <PrivateRoute path='/dialog/:profile_id' component={MainPage} />
                <Route path='/profile/:profile_id' component={ProfilePage} />
                <Route exact path='/' component={AuthorizationScreen} />
                <Route component={NotFound} />
            </Switch>
        </Router>
        </div>
    )
}

export default App;