import React,{Component} from 'react';
import './App.css';
import Form from './Form';

class Usuario extends Component
{
  render(){
    return(
      <div>
        <img src={this.props.image} />
        <p>{this.props.nombre}</p>
      </div>
    );
  }
}

class Usuarios extends Component{
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    fetch("https://randomuser.me/api/?results=3")
      .then(response => response.json())
      .then(data => {
        this.setState({users: data.results})
        console.log(data.results);
      });
  }

  render(){
    const filas = this.state.users.map((fila,index) => {
      return (<Usuario key={index} nombre={fila.name.first + " " + fila.name.last} image={fila.picture.medium} />)
    }
    );
    return(
      <div>
        {filas}
      </div>
    )
  }
}

class App extends Component
{
    render() {
        return (
                <Form/>
         );
    }
};

export default App;
