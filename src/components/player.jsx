import React, { Component } from 'react';

class Player extends Component {


    state = {
        player : this.props.player,
    }

    
       
    render() { 
        return ( 
            <div className="col-sm-3 mx-auto">
                <p>({this.props.player.class}) Player {this.props.player.name}'s HP: {this.props.player.hp}</p>
            </div>
         );
    }
}
 
export default Player;