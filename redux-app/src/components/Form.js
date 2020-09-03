import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty } from 'lodash';
import { getDataUsers, addUser, editUser } from "../actions/index";

const mapStateToProps = state => {
    return { edit_object: state.object };
}

const mapDispatchToProps = {
    getDataUsers, addUser, editUser
}

class ConnectedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            url_photo: "",
            name: "",
            email: "",
            adress: "",
            state: false
        };
    }

    static getDerivedStateFromProps(props, state) {
        console.log(props);
        if (!isEmpty(props.edit_object) && !state.state) {
            return {
                id: props.edit_object.id,
                url_photo: props.edit_object.url_photo,
                name: props.edit_object.name,
                email: props.edit_object.email,
                adress: props.edit_object.adress,
                state: true
            }
        }
        else {
            return state;
        }
    }

    handleChange = (event) => {
        console.log("change " + event.target.value);
        this.setState({ [event.target.id]: event.target.value });
    }

    adduser = (event) => {
        event.preventDefault();
        if (!this.state.state) {
            const object = {
                url_photo: this.state.url_photo,
                name: this.state.name,
                email: this.state.email,
                adress: this.state.adress
            }
            this.props.addUser(object).then(this.setState({
                id: "",
                url_photo: "",
                name: "",
                email: "",
                adress: "",
                state: false
            })).then(x => this.props.getDataUsers());
        }
        else {
            const obj1 = {
                id: this.state.id,
                url_photo: this.state.url_photo,
                name: this.state.name,
                email: this.state.email,
                adress: this.state.adress
            }
            this.props.editUser(obj1).then(() => this.setState({
                id: "",
                url_photo: "",
                name: "",
                email: "",
                adress: "",
                state: false
            })).then(x => this.props.getDataUsers());
        }
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <h1>Add users</h1>
                    <label htmlFor="title">Photo</label>
                    <input
                        type="text"
                        id="url_photo"
                        className="form-control"
                        value={this.state.url_photo}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="title">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="title">Email</label>
                    <input
                        type="text"
                        id="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="title">Adress</label>
                    <input
                        type="text"
                        id="adress"
                        className="form-control"
                        value={this.state.adress}
                        onChange={this.handleChange}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.adduser}>Add</button>&nbsp;
            </form>
        );
    }
}

const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

export default Form;