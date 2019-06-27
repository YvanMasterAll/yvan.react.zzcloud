import React from 'react';

export class Login extends React.Component {
    render() {
        return (
            <div className="main-content">
                <button onClick={this.props.login}>
                    login
                </button>
            </div>
        )
    }
}