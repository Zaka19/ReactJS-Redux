import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "../actions"; 

const mapStateToProps = state => {
    return { array: state.array };
}


class ConnectedList extends Component {
    
    componentDidMount() {
        this.props.getData();
    }

    render() {
        const fila = this.props.array.map(el => 
            (<li style={{display: "flex", justifyContent: "space-between"}} key={Math.random()} className="list-group-item"> 
                <div style={{display: "inline-block"}}>
                     {el.title}
                </div>
            </li>));
        return (
            <ul className="list-group">
              {fila} 
            </ul>
        );
    }
}

const List = connect(mapStateToProps,{getData})(ConnectedList);



export default List;