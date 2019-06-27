import React from 'react';
import {Navbar} from './navbar';
import {Home} from "./home";
import './index.css';

export class Index extends React.Component {
    render() {
        return (
            <div className='wrapper'>
                <div className="main-navbar">
                    <Navbar {...this.props}/>
                </div>
            </div>
        )
    }
}