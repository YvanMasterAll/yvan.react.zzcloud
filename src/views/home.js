import React from 'react';

export class Home extends React.Component {
    record_list() {
        this.props.record_list(0)
    }

    render() {
        console.log(this.props.records)
        return (
            <div className="main-content">
                <h1>Welcome</h1>
                <p>This is the home page</p>
                <p>The time is {this.props.currentTime.toString()}</p>
                <button onClick={this.props.updateTime}>
                    Update
                </button>
                <button onClick={this.record_list.bind(this)}>
                    Records
                </button>
            </div>
        )
    }
}