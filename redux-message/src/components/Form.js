import React, { Component } from "react";
import { connect } from "react-redux";
import { add } from "../actions/index";

const mapDispatchToProps = {
    add
}

class ConnectedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ""
        };
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const title = this.state.title;
        this.props.add(title);
        this.setState({ title: ""});
    }

    render() {
        const { title } = this.state;
        return (
            <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            placeholder="Entra un mensaje:"
                            value={title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="button" className="btn btn-primary">Add article</button>&nbsp;
            </form>
        );
    }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm);

export default Form;