import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { saldo: state.saldo, extra: state.extra , insufficientMoney: state.insufficientMoney, limitGet: state.limitGet };
}

class ConnectedSaldo extends Component {

    render() {
        let ins = "";
        let lim = "";

        this.props.insufficientMoney ? ins = "Dinero insuficiente..." : ins = "";
        this.props.extra ? lim = "Limite superado..." : lim = "";

        const saldo = this.props.saldo;
        const extra = this.props.extra;

        return (
            <div className="container-fluid">
                <h2>Saldo: {saldo}</h2>
                <h3 style={{color: 'green'}}>Extras: {extra}</h3>
                <p style={{color: 'red'}}>{ins}</p>
                <p style={{color: 'red'}}>{lim}</p>
            </div>
        );
    }
}


const Saldo = connect(mapStateToProps)(ConnectedSaldo);

export default Saldo;