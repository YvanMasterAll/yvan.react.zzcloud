import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import init from './init'
import Index from '../containers/index'
import Home from '../containers/home'
import About from '../containers/about'
import Logout from '../containers/logout'
import Login from '../containers/login'

export class App extends React.Component {
    componentDidMount() {
		init()
    }
    
    render() {
        return (
            <Router>
                <div>
                    <Route path="/" component={Index} />
                    <Route path="/home" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        )
    }
}

export default App




