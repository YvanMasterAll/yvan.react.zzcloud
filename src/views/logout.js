import React from 'react';

export class Logout extends React.Component {
    render() {
        return (
            <div className="main-content">
                <button onClick={this.props.logout}>
                    logout
                </button>
            </div>
        )
    }
}