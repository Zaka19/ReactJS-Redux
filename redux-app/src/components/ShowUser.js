import React, { Component } from "react";
import { connect } from "react-redux";
import { getDataUsers, deleteUser, edit } from "../actions";

const mapStateToProps = state => {
    return { array: state.array };
}


class ConnectedUsers extends Component {

    componentDidMount() {
        this.props.getDataUsers();
    }

    deleteUser = (id) => {
        this.props.deleteUser(id).then(x => this.props.getDataUsers());
    }

    render() {
        const user = this.props.array.map((el, id) =>
            (<div key={id} className="card bg-primary text-white" style={{ width: 300, margin: '10px' }}>
                <img className="card-img-top" src={el.url_photo} alt="Card user" style={{ width: 300, height: 300 }} />
                <div className="card-body">
                    <h5 className="card-title">{el.name}</h5>
                    <p className="card-text">
                        {el.email}<br />
                        {el.adress}
                        {/* {el.location.street.name} n {el.location.street.number}  {el.location.postcode}, {el.location.city} */}
                    </p>
                </div>
                <button type="button" className="btn btn-info" onClick={() => this.props.edit(el)}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={() => this.deleteUser(el.id)}>Delete</button>
            </div>));
        return (
            <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {user}
            </div>
        );
    }
}

const ListUsers = connect(mapStateToProps, { getDataUsers, deleteUser, edit })(ConnectedUsers);

export default ListUsers;