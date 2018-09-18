import React, { Component } from 'react';

class ActionLog extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container">
                <p>
                    Player {this.props.turn}'s Turn
                </p>
            </div>
         );
    }
}
 
export default ActionLog;