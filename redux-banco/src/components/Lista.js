import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { arrayMov: state.arrayMov };
}

class ConnectedList extends Component {

    render() {
        const registro = this.props.arrayMov.map(x => 
            (<li style={{display: "flex", justifyContent: "space-between"}} key={Math.random()} className="list-group-item"> 
                <div style={{display: "inline-block"}}>
                    {x.hour}:{x.min}:{x.second} - {x.day}/{x.month+1}/{x.year}   {x.movement}  {x.pending}
                </div>
            </li>));
        return (
            <ul className="list-group">
              {registro} 
            </ul>
        );
    }
}

const List = connect(mapStateToProps)(ConnectedList);



export default List;