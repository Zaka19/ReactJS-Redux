import React,{Component} from 'react';

class FormF extends Component
{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            game : "",
            dateAndTime : "",
            difficulty : "",
            playerId : parseInt(this.props.id)
        }
    }

    // componentDidMount = () =>{
    //     fetch("https://localhost:44319/api/Players/"+this.props.id)
    //     .then(response => response.json())
    //     .then(data => this.setState({  
    //         name : data.name,
    //         game : data.game,
    //         dateAndTime : data.dateAndTime,
    //         difficulty : data.difficulty,
    //         playerId : data.playerId
    //         })
    //     );
    // }

    change = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }
    
    add = () => {
            let params = {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            };
            console.log(this.state);
            fetch('https://localhost:44319/api/Parties/', params)
            .then(response => response.json())
                .then(json =>{ this.setState({
                    name : "",
                    game : "",
                    dateAndTime : "",
                    difficulty : ""
                })
                let success = document.getElementById("success");
                success.innerHTML="Created succefully!!!";
            })
            .catch(error => console.log(error));
        // else{
        //     let params = {
        //         method: 'PUT',
        //         body: JSON.stringify(this.state),
        //         headers: {
        //             "Content-type": "application/json; charset=UTF-8"
        //         }
        //     };
        //     console.log(this.state);
        //     fetch('https://localhost:44319/api/Players/'+this.state.id, params)
        //     .then(response => {this.componentDidMount()
        //         let success = document.getElementById("success");
        //         success.innerHTML="Update succefully!!!";})
        //     .catch(error => console.log(error));
        // }

    }

    render() {
        return (
            <div className="container">

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" value={this.state.name} onChange={this.change} className="form-control" name="name" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gane">Game:</label>
                        <input type="text" value={this.state.game} onChange={this.change} className="form-control" name="game" placeholder="Enter game" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateAndTime">DateTime:</label>
                        <input type="text" value={this.state.dateAndTime} onChange={this.change} className="form-control" name="dateAndTime" placeholder="Enter datetime (2000-06-05T00:00:00)"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="difficulty">Difficulty:</label>
                        <input type="text" value={this.state.difficulty} onChange={this.change} className="form-control" name="difficulty" placeholder="Enter difficulty"/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.add} >Submit</button>

                    <div>
                        <p id="success"></p>
                    </div>
            </div>
        );
    }
};

class FormGame extends Component{
    render(){
        return(
            <FormF id={this.props.id}/>
        );
    }
}

export default FormGame;
