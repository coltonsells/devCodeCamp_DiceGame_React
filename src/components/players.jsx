import React, { Component } from 'react';
import Player from './player'


class Players extends Component {
    
    
        render() { 

        return (
            <div className="container">
            <div className="row mx-auto">
                {this.props.players.map(player => (
                    player.hp > 0
                    ? 
                    <Player  key={player.name} player={player}/> 
                    :
                    <p>Player {player.name} is dead</p>
                )    
                )}
            </div>
            </div>
         );
    }
}
 
export default Players ;