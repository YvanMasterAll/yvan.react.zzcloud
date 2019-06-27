import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom';
import './route.css';

//fake Authentication
const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true,
        setTimeout(cb, 100) //fake sync
    },
    signout(cb) {
        this.isAuthenticated = false,
        setTimeout(cb, 100)
    }
}

//Router Demo
const iRoute = () => (
    <Router>
        <div> 
            <Welcome />
            <ul>
                <li><Link to="/public">Public Page</Link></li>
                <li><Link to="/protected">Protected Page</Link></li>
            </ul>

            <Route path="/public" component={Public}></Route>
            <Route path="/login" component={Login}></Route>
            <PrivateRoute path="/protected" component={Protected}></PrivateRoute>
        </div>
    </Router>
)

//Welcome
const Welcome = withRouter(({history}) => (
    fakeAuth.isAuthenticated? (
        <p>Welcome!<input type="button" value="Sign out" onClick={() => {fakeAuth.signout(() => history.push('/'))}} /></p>
    ) : (
        <p>You are not logged in.</p>   
    )
))
//Public
const Public = () => (
    <p>Public</p>
)
//Protected
const Protected = () => (
    <p>Protected</p>
)
//PrivateRoute
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={ props => (
        fakeAuth.isAuthenticated? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )
    )} />
)
//Login
class Login extends React.Component {
    state = {
        redirectToReferer: false
    }
    login = () => {
        fakeAuth.authenticate(() => {
            this.setState({
                redirectToReferer: true
            })
        })
    }
    render() {
        const {from} = this.props.location.state || { from: { pathname: '/' }};
        const {redirectToReferer} = this.state;
        if(redirectToReferer) {
            return (
                <Redirect to={from} />
            )
        }
        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <input type="button" value="Log in" onClick={this.login} />
            </div>
        )
    }
}

export default iRoute
