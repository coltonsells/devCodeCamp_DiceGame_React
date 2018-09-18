import React, { Component } from 'react';

class Moves extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container">
            <button className="btn" onClick={this.props.attack} id="attack">
            Attack
            </button>
            <button className="btn" id="spell" onClick={this.props.spell}>
            Spell
            </button>
            <button className="btn" id="defend" >
            Defend
            </button>
            <button className="btn" id="rest" onClick={this.props.heal}>
            Rest
            </button>
            </div>
         );
    }
}
 
export default Moves;