import {Component} from 'react';
import PiggyBank from '../icons/piggy-bank_w.svg';



class BankScore extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className = "pair">
                    {this.props.isIn ? (
                    <div className = "button" onClick={e => this.props.setPlayerScore(this.props.player)}>
                        <img src={PiggyBank} alt="Bank"/>
                    </div>) : (
                    <div className = "button disabled">
                        <img src={PiggyBank} alt="Bank"/>
                    </div>)
                    }
                    <div className = "score">
                        <h3>{this.props.name}</h3>
                        <p>{this.props.score}</p>
                    </div>
                </div>   
        );
    }
}
export default BankScore;