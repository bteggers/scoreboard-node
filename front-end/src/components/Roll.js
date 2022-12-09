import {Component} from 'react';



class Roll extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className = {this.props.rollCount<=3 && this.props.value==="x2"?("button disabled small"):("button small")} onClick={e => this.props.rollNum(this.props.value)}>
                <h3>{this.props.value}</h3>
            </div>    
        );
    }
}
export default Roll;