import React,{Component} from 'react';

class FormF extends Component
{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            email : "",
            nick : "",
        }
    }

    componentDidMount = () =>{
        if (this.props.id !== undefined){
        fetch("https://localhost:44319/api/Players/"+this.props.id)
        .then(response => response.json())
        .then(data => this.setState({  
            id:parseInt(this.props.id),
            name : data.name,
            email : data.email,
            nick : data.nick 
        }));
    }
    }

    change = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }
    
    add = () => {
        if (this.state.id === undefined){
            let params = {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            };
            console.log(this.state);
            fetch('https://localhost:44319/api/Players', params)
            .then(response => this.componentDidMount())
                .then(json =>{ this.setState({
                    name : "",
                    email : "",
                    nick : ""
                })
                let success = document.getElementById("success");
                success.innerHTML="Created succefully!!!";
            })
            .catch(error => console.log(error));
        }
        else{
            let params = {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            };
            console.log(this.state);
            fetch('https://localhost:44319/api/Players/'+this.state.id, params)
            .then(response => {this.componentDidMount()
                let success = document.getElementById("success");
                success.innerHTML="Update succefully!!!";})
            .catch(error => console.log(error));
        }

    }

    render() {
        return (
            <div className="container">

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" value={this.state.name} onChange={this.change} className="form-control" name="name" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" value={this.state.email} onChange={this.change} className="form-control" name="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nick:</label>
                        <input type="text" value={this.state.nick} onChange={this.change} className="form-control" name="nick" placeholder="Enter nick" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.add} >Submit</button>

                    <div>
                        <p id="success"></p>
                    </div>
            </div>
        );
    }
};

class Form extends Component{
    render(){
        return(
            <FormF id={this.props.id}/>
        );
    }
}

export default Form;
