import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteArticles, editArticles } from "../actions/index";

const mapDispatchToProps = {
    editArticles, deleteArticles
}

const mapStateToProps = state => {
    return { articles: state.articles };
}

class ConnectedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_articles: this.props.articles
        };
    }

    // componentWillReceiveProps(props) {
    //     this.setState({
    //         show_articles: props.articles
    //     }); 
    // }

    // static getDerivedStateFromProps(props,state) {
    //     if(!isEmpty(props.show_articles)){
    //         return {title: props.object.title, id: props.object.id, state: true}
    //     }
    //     else{
    //         return state;
    //     }
    // }

    render() {
        const fila = this.props.articles.map(el => 
            (<li style={{display: "flex", justifyContent: "space-between"}} key={Math.random()} className="list-group-item"> 
                <div style={{display: "inline-block"}}>
                    {el.id}. {el.title}
                </div>
                <div style={{display: "inline-block"}}> 
                    <button className="btn btn-primary" onClick={() => this.props.editArticles(el)}> Edit </button> &nbsp;
                    <button className="btn btn-primary" onClick={() => this.props.deleteArticles(el.id)}> Delete </button> 
                </div>
            </li>));
        return (
            <ul className="list-group">
              {fila} 
            </ul>
        );
    }
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);



export default List;