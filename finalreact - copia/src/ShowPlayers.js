import React,{Component} from 'react';
import './App.css';
import { Link } from "react-router-dom";

class Filas extends Component{

  delete = () => {
    this.props.delete(this.props.id);
  }

  render(){
    return(
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.email}</td>
        <td>{this.props.nick}</td>
        <td><Link to={"/create/"+this.props.id}><button className="btn btn-primary">Create game</button></Link>&nbsp;
        <Link to={"/edit/"+this.props.id}><button className="btn btn-primary">Edit</button></Link>&nbsp;
        <button className="btn btn-primary" onClick={this.delete}>Delete</button></td>
      </tr>
    );
  }
}

class Tabla extends Component{
 constructor(props){
   super(props);
   this.state = {
     Players : []
   }
 }

componentDidMount(){
  fetch("https://localhost:44319/api/Players")
  .then(response => response.json())
  .then(data => this.setState({Players : data }));
}

delete = (id) => {
  let params = {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  console.log(id);
  fetch('https://localhost:44319/api/Players/' + id, params)
    .then(response => {
        console.log("Holi");
        this.componentDidMount()})
    .catch(error => console.log(error));
}

  render(){
    const players = this.state.Players.map((fila,index) => {
      return (<Filas key={fila.id} id={fila.id} name={fila.name} email={fila.email} nick={fila.nick}  delete={this.delete} />);
    });
    return (
        <div className="container">
            <table id="table" className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Nick</th>
                </tr>
                </thead>
                <tbody>
                    {players}
                </tbody>
            </table>
      </div>
  );
  }

}

class Player extends Component
{
    render() {
        return (
                <>
                <Tabla/>
                </>
                );
    }
};

export default Player;
