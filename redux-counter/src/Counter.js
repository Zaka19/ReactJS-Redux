import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state){
  return {
    count: state.count
  }
}

class Counter extends React.Component {
    // state = { count: 0 }
   
    increment = () => {
      this.props.dispatch({ type: "Increment" });
    }
   
    decrement = () => {
      this.props.dispatch({ type: "Descrement" });
    }

    reset = () => {
      this.props.dispatch({ type: "Reset" });
    }
   
    render() {
      return (
        <div className="jumbotron text-center">
          <h2>Counter</h2>
          <div>
            <button className="btn-primary" onClick={this.decrement}>-</button>
            <span>{this.props.count}</span>
            <button className="btn-primary" onClick={this.increment}>+</button>
            <br></br><br></br>
            <button className="btn-primary" onClick={this.reset}> Reset </button>
          </div>
        </div>
      )
    }
  }
   
  export default connect(mapStateToProps)(Counter);
  