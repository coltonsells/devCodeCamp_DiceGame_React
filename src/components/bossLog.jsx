import React, { Component } from 'react';

class BossLog extends Component {
    state = {  }
    render() { 
        return (
            <div className="container"> 
                <p>
                    {this.props.text}
                </p>
            </div> 
         );
    }
}
 
export default BossLog;