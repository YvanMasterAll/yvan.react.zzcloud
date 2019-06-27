import React from 'react';
import {Link} from 'react-router-dom';

export class Navbar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <Link className="link" to="/home">
                    Home
                </Link>
                <Link className="link" to="/about">
                    About
                </Link>
                {
                    this.props.loggedIn?
                    <Link className="link" to="/logout">
                        Logout
                    </Link> :
                    <Link className="link" to="/login">
                        Login
                    </Link>
                }
            </div>
        )
    }
}