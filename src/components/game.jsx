import React, { Component } from 'react';
import Moves from './moves';
import Boss from './boss';
import Players from './players';
import ActionLog from './actionLog';
import BossLog from './bossLog'


class Game extends Component {
    state = { 
        Boss : { 
            name: "Boss",
            hp: 100,
            str: 100,
            def: 50,
            magic: 100,
            basestr: 100,
            basedef: 100,
            basemagic: 100,
         },

         players : [{ 
            name: null,
            class: null,
            hp: null,
            str: null,
            def: null,
            magic: null,
            basedef: null,
            basestr: null,
            basemagic: null
        }],
         
        playerAmount : 0,

        win : false,

        lose: false,

        turn: 1,

        actionLogText: "Ready to go",

        criticalHit: "",

        bossLogText: "Boss is ready",
        
    }

        setBossDifficulty = players => {
        let level = players;
        let bonus = this.diceRoll(10) * 10;
        let Boss = { 
            name: "Boss", hp: (100*level + bonus), str: 100, def: 50, magic: 100, basestr: 100, basedef: 100, basemagic: 100,
         };

        this.setState({Boss})
        
    }


    playerArray = num => {
        let players = []
        for(let i=0; i < num; i++){
            let answer = prompt("Which class will player "+(i+1)+" be"+
                                "\nChoose 1 for Knight"+
                                "\nChoose 2 for Mage"+
                                "\nChoose 3 for Beserker");
            if(answer === '1'){
                players.push({name: i+1, class:"Knight", hp:100, str:60, def:70, magic:20, basedef:70, basestr:60, basemagic:20})
            }
            else if(answer === '2'){
                players.push({name: i+1, class:"Mage", hp:60, str:40, def:60, magic:100, basedef:60, basestr:40, basemagic:100})
            }
            else if(answer === '3'){
                players.push({name: i+1, class:"Beserker", hp:80, str:100, def:30, magic:50, basedef:30, basestr:100, basemagic:50})
            }
           else{
               alert('Error: Please choose one of the three options');
           }
       }
       this.setState({players})
    }


    getPlayerNum = () =>{
        let result = prompt("How many players");
        return result;
    }

    diceRoll = num => {
        let roll = Math.random() * num + 1;
        roll = Math.floor(roll);
        return roll;
    }

    turnRolls = () => {
        let results = [];
        let sixSideDice = this.diceRoll(6);
        results.push(sixSideDice);
        let fourSideDice = this.diceRoll(4);
        results.push(fourSideDice);
        let fiveSideDice = this.diceRoll(12);
        results.push(fiveSideDice);
        let sevenSideDice = this.diceRoll(20);
        results.push(sevenSideDice);
        let eightSideDice = this.diceRoll(8);
        results.push(eightSideDice);
        let tenSideDice = this.diceRoll(10);
        results.push(tenSideDice);

        return results;
    }    

    getSum = rolls => {
        let sum = 0;
        for(let i=0; i < rolls.length; i++){
            sum += rolls[i];
        }
        return sum;
    }

    handleChange = event => {
        //event.preventDefault();
        let x = event.target.value;
        this.setState({playerAmount: x});
        this.playerArray(event.target.value);
        this.setBossDifficulty(event.target.value);
        
    }

    checkForCrit = results => {
        let checkNum;
        let crit = false;
        let counter = 0;
        let checkList = []
        for(let i=0; i < results.length; i++){
            checkNum = results[i];
            if(!checkList.includes(checkNum)){
                checkList.push(checkNum);
                for(let j = i; j < results.length; j++){
                    if(checkNum == results[j]){
                        counter++;
                    }
                }
                if(counter > 3){
                    crit = true;
                    break
                }
                else{
                    counter = 0;
                }
            }
        }
        return crit;
    }    

    checkForMiss = results =>{
        let miss = false;
        let counter = 0;
        for(let i=0; i < results.length; i++){
            if(results[i] == 1){
                counter++;
            }
        }
        if(counter > 1){
            miss = true;
        }    
        return miss
    }

    checkWin= () => {
        if(this.state.Boss.hp <= 0){
            let win = true;
            let actionLogText = "You beat the Boss";
            this.setState({win});
            this.setState({actionLogText});
            return true;
        }
        else{
            return false;
        }
    }

    checkLoss= () => {
        if(this.state.players.length == 0 || this.state.players.length == null){
            let lose = true;
            this.setState({lose});
        }
    }

    bossAttackChoice = () => {
        let roll = Math.random() * this.state.players.length;
        roll = Math.floor(roll);
        return roll;
    }

    bossOptionChoice = () => {
        let choice = this.diceRoll(6)
        return choice;
    }

    bossMove =() =>{
        let target = this.bossAttackChoice();
        let bossRolls = this.turnRolls();
        let sum = this.getSum(bossRolls);
        let bossChoice = this.bossOptionChoice();
        let criticalHit = ""

        let boost = 0;
        


        if(bossChoice == 1 || bossChoice == 2 || bossChoice == 4 || bossChoice == 5 || bossChoice == 6 || bossChoice == 3){
            let miss = this.checkForMiss(bossRolls);
                if(miss == false){
                    let crit = this.checkForCrit(bossRolls)
                    if(crit == true){
                        boost = 15;
                    }
                    let damage = this.state.Boss.str - this.state.players[target].def;
                    if(damage <= 0){
                        damage = 1;
                    }
                    let players = this.state.players;
                    players[target].hp = players[target].hp - (damage + sum + boost);
                    this.setState({players});
                    let bossLogText = "Boss attacks Player " + this.state.players[target].name + ", Boss does " + damage + " damage";
                    this.setState({bossLogText});


                    for(let x=0; x < this.state.players.length; x++){
                        if(this.state.players[x].hp <= 0){
                            let players = this.state.players;
                            let bossLogText = "Player " + this.state.players[x].name + " has DIED";
                            this.setState({bossLogText});
                            let index = players.indexOf(players[x]);
                            players.splice(index, 1);
                            this.setState({players});
                        }
                    }
                    }
                else{
                    let bossLogText = "The Boss attacks Player " + this.state.players[target].name + " but the Boss missed";
                    this.setState({bossLogText});
                }    
            }
    }

    handleAttack = () => {
            
            let rolls = this.turnRolls();
            let index = this.state.turn - 1;
            let crit = this.checkForCrit(rolls);
            let miss = this.checkForMiss(rolls)
            let sum = this.getSum(rolls);
            let boost = 0;
            let criticalHit = "";
            this.setState({criticalHit})
                
            if(miss == false){
                if(crit == true){
                    boost = 50;
                    criticalHit = "CRITICAL HIT";
                    this.setState({criticalHit});
                }
                let damage = (this.state.players[index].str + sum + boost) - this.state.Boss.def;
                if(damage <= 0){
                    damage = 0;
                }
                let Boss = this.state.Boss;
                Boss.hp = Boss.hp - damage;
                let bossLogText = this.state.criticalHit + " Player " + this.state.turn +" did " + damage + " damage";
                this.setState({bossLogText});
                this.setState({Boss});

                let cw = this.checkWin();
                      
                if(this.state.turn < this.state.players.length){
                    let turn = this.state.turn + 1;
                    this.setState({turn})
                }
                else if(this.state.turn >= this.state.players.length){
                    let turn = 1;
                    this.setState({turn});
                    if(cw == false){
                    this.bossMove(); 
                    }   
                    this.checkLoss();
                }
            }
            else{
                let bossLogText = "Player " + this.state.players[index].name + " Missed";
                this.setState({bossLogText});

                if(this.state.turn < this.state.players.length){
                    let turn =  this.state.turn + 1;
                    this.setState({turn})
                }
                else if(this.state.turn >= this.state.players.length){
                    let turn = 1;
                    this.setState({turn});
                    this.bossMove();    
                    this.checkLoss();
                }
            }
    }

    handleSpell = () => {
            
        let rolls = this.turnRolls();
        let index = this.state.turn - 1;
        let crit = this.checkForCrit(rolls);
        let miss = this.checkForMiss(rolls)
        let boost = 0;
        let sum = this.getSum(rolls);
        let criticalHit = "";
        this.setState({criticalHit})

        if(miss == false){
            if(crit == true){
                boost = 50;
                criticalHit = "CRITICAL HIT";
                this.setState({criticalHit});
            }
            let damage = (this.state.players[index].magic + sum + boost) - this.state.Boss.def;
            if(damage <= 0){
                damage = 0;
            }
            let Boss = this.state.Boss;
            Boss.hp = Boss.hp - damage;
            let bossLogText = this.state.criticalHit + " Player " + this.state.turn +" cast a spell and did " + damage + " damage";
            this.setState({bossLogText});
            this.setState({Boss});

            let cw = this.checkWin();
                  
            if(this.state.turn < this.state.players.length){
                let turn = this.state.turn + 1;
                this.setState({turn})
            }
            else if(this.state.turn >= this.state.players.length){
                let turn = 1;
                this.setState({turn});
                if(cw == false){
                this.bossMove(); 
                }   
                this.checkLoss();
            }
        }
        else{
            let bossLogText = "Player " + this.state.players[index].name + " Missed";
            this.setState({bossLogText});

            if(this.state.turn < this.state.players.length){
                let turn =  this.state.turn + 1;
                this.setState({turn})
            }
            else if(this.state.turn >= this.state.players.length){
                let turn = 1;
                this.setState({turn});
                this.bossMove();    
                this.checkLoss();
            }
        }
}

    handleRest = () => {
        let index = this.state.turn - 1;
        let criticalHit = "";
        this.setState({criticalHit})

            let heal = 50;
            let players = this.state.players;
            players[index].hp += heal;
            this.setState({players});
            let bossLogText =  " Player " + this.state.turn +" healed for " + heal + " HP";
            this.setState({bossLogText});
                  
            if(this.state.turn < this.state.players.length){
                let turn = this.state.turn + 1;
                this.setState({turn})
            }
            else if(this.state.turn >= this.state.players.length){
                let turn = 1;
                this.setState({turn});
                this.bossMove(); 
                this.checkLoss();
            }
    }
    

    refreshPage = () => {
        window.location.reload();
    }
 
    render() {
        console.log("render state", this.state.playerAmount);
        if(this.state.playerAmount < 1){
            
        return ( 
            <div className="container">
                <form onSubmit={this.handleChange} >
                    <label  className="col-8  mx-auto">How many players?</label><br></br>
                    <input  type="text" id="example-text-input"  onChange={this.handleChange} /><br></br>
                </form>
            </div>
        );}
           
        else{
           return(
            
            <div className="container mx-auto">
                <div className="row">
                    <Boss boss={this.state.Boss}/>
                </div>
                {this.state.lose == false && this.state.win == false
                ?
                    <div className="container mx-auto pb-5 pt-5">
                        <div className="row">
                            <BossLog text={this.state.bossLogText}/>
                        </div>
                        <div className="row">
                            <Moves attack={this.handleAttack} spell={this.handleSpell} heal={this.handleRest}/>
                        </div>
                        <div className="row">
                            <ActionLog turn={this.state.turn} />
                        </div>
                    </div>
                :
                    this.state.lose == true ?
                <   div className="container mx-auto pt-5 pb-5">
                        <div className="mx-auto">
                            <p>You Lose</p>
                            <button type="submit" value="Try Again" onClick={this.refreshPage}>Try Again?</button>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="container mx-auto pt-5 pb-5">
                        <div className="mx-auto">
                            <p>You Beat the Boss, YOU WIN!</p>
                            <button type="submit" value="Try Again" onClick={this.refreshPage}>Try Again?</button>
                        </div>
                        </div>
                    </div>
                    }    
                <div className="row mx-auto">
                    <Players 
                    players={this.state.players}
                    />  
                </div>
            </div>
                );
        }
    }
}
 
export default Game;