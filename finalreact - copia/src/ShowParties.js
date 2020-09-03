import React,{Component} from 'react';
import './App.css';
import {
          Link
          } from "react-router-dom";
class Filas extends Component{

  delete = () => {
    this.props.delete(this.props.id);
  }

  render(){
    return(
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td>{this.props.game}</td>
        <td>{this.props.dateAndTime}</td>
        <td>{this.props.difficulty}</td>
        <td>{this.props.playerId}</td>
        <td><Link to={"/playerGameadd/"+this.props.id}><button className="btn btn-primary">Details</button></Link>&nbsp;
        <button className="btn btn-primary" onClick={this.delete}>Delete</button></td>
      </tr>
    );
  }
}

class Tabla extends Component{
 constructor(props){
   super(props);
   this.state = {
     Parties : [],
     Creators : []
   }
 }

componentDidMount(){
  fetch("https://localhost:44319/api/Parties")
  .then(response => response.json())
  .then(data =>{
    this.setState({Parties : data})
     data.forEach(element => {
      fetch("https://localhost:44319/api/Players/" + element.playerId)
      .then(response => response.json())
      .then(data =>{
        let a =  this.state.Creators;
        a.push({id: element.id, creator:data.name});
        this.setState({
          Creators:  a
        })
      });    
    });
  });
}

delete = (id) => {
  let params = {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  console.log(id);
  fetch('https://localhost:44319/api/Parties/' + id, params)
    .then(response => {
        this.componentDidMount()})
    .catch(error => console.log(error));
}

  render(){

    const parties = this.state.Parties.map((fila,index) => {

      if (this.state.Creators.find(x=>x.id === fila.id) !== undefined) {
        return (<Filas
          key={fila.id} 
          id={fila.id} 
          name={fila.name} 
          game={fila.game} 
          dateAndTime={fila.dateAndTime.split('T')[0]} 
          difficulty={fila.difficulty} 
          playerId={this.state.Creators.find(x=>x.id === fila.id).creator} 
          delete={this.delete} />);

      }
      
    });
    return (
        <div className="container">
            <table id="table" className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Game</th>
                    <th>DateAndTime</th>
                    <th>Difficulty</th>
                    <th>Creator ID</th>
                </tr>
                </thead>
                <tbody>
                    {parties}
                </tbody>
            </table>
      </div>
  );
  }

}

class Party extends Component
{
    render() {
        return (
                <>
                <Tabla/>
                </>
                );
    }
};

export default Party;