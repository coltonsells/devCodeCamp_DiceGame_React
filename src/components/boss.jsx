import React, { Component } from 'react';

class Boss extends Component {
    
    render() { 
        return ( 
            this.props.boss.hp > 0
            ?
            <p className="mx-auto">Boss's HP: {this.props.boss.hp}</p>
            :
            <p className="mx-auto">The Boss is dead, You Win</p>
         );
    }
}
 
export default Boss;