import React, { Component } from "react";
import { connect } from "react-redux";
import { addSaldo, removeSaldo } from "../actions/index";

const mapDispatchToProps = {
    addSaldo, removeSaldo
}

class ConnectedButtons extends Component{
    constructor(props){
        super(props);
        this.state = {
            saldo:0
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        const price = this.state.saldo;
        this.props.addSaldo(parseInt(price));  
        this.setState({saldo: 0});  
    }

    handleRemove = (event) =>{
        event.preventDefault();
        const price = this.state.saldo;
        this.props.removeSaldo(parseInt(price));  
        this.setState({saldo: 0});  
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="money">Introduce el valor:</label><br></br>
                <input type="number" className="form-control" value = {this.state.saldo} onChange={this.handleChange} placeholder="0.00..." id="saldo" min="0"/><br></br>
                <input type="submit"className="btn btn-primary" value="Ingresar" /> &nbsp;&nbsp;
                <input type="button" className="btn btn-primary" onClick = {this.handleRemove} value="Retirar" />
            </form>
        );
    }
}

const Form = connect(null, mapDispatchToProps)(ConnectedButtons);

export default Form;

