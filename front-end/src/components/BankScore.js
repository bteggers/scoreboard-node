import {Component} from 'react';
import PiggyBank from '../icons/piggy-bank_w.svg';



class BankScore extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className = "pair">
                    <div className = "textbox">
                        <h3>{this.props.name}</h3>
                        <p>{this.props.score}</p>
                    </div>
                    {this.props.isIn ? (
                    <div className = "button small" onClick={e => this.props.setPlayerScore(this.props.player)}>
                        <img src={PiggyBank} alt="Bank"/>
                    </div>) : (
                    <div className = "button small disabled">
                        <img src={PiggyBank} alt="Bank"/>
                    </div>)
                    }
                </div>   
        );
    }
}
export default BankScore;