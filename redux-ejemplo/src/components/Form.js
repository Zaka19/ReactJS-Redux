import React, { Component } from "react";
import { connect } from "react-redux";
import { isEmpty} from 'lodash';
import { addArticle, resetArticles, editArticlesPlus } from "../actions/index";

// function mapDispatchToProps(dispatch) {
//     return {
//         addArticle: article => dispatch(addArticle(article))
//     };
// }

const mapDispatchToProps = {
    addArticle, resetArticles, editArticlesPlus
}

const mapStateToProps = state => {
    return { object: state.edit_title };
}

class ConnectedForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            title: "",
            state: false
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = (event) => {
        if(!this.state.state){
            event.preventDefault();
            const { title } = this.state;
            this.props.addArticle(title);
            this.setState({ title: "", state: ""});
        }
        else{
            event.preventDefault();
            const new_object = {id: this.state.id, title: this.state.title};
            this.props.editArticlesPlus(new_object);
            this.setState({ title: "", state: ""});
        }

        this.setState({ id: "",
        title: "",
        state: false})
    }

    handleReset = (event) => {
        event.preventDefault();
        this.props.resetArticles();
    }  

    static getDerivedStateFromProps(props,state) {
        if(!isEmpty(props.object) && !state.state){
            return {title: props.object.title, id: props.object.id, state: true}
        }
        else{
            return state;
        }
        // this.setState({
        //     id: props.object.id, title: props.object.title, state: "edit"
        // });
    }

    render() {
        const { title } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            placeholder="Entra un valor"
                            value={title}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add article</button>&nbsp;
                    <button type="button" onClick={this.handleReset} className="btn btn-primary">Reset articles</button>
            </form>
        );
    }
}

const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

export default Form;