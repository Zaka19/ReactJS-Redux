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
        <td>{this.props.service}</td>
        <td>{this.props.date}</td>
        <td>{this.props.prices}</td>
        <td>{this.props.hojadeservicioId}</td>
        <Link to={"/edit/"+this.props.id}><button>Editar</button></Link>
        <button onClick={this.delete}>Eliminar</button>
      </tr>
    );
  }
}

class Tabla extends Component{
 constructor(props){
   super(props);
   this.state = {
     Lineas : []
   }
 }

componentDidMount(){
  fetch("https://localhost:44338/api/Lineas")
  .then(response => response.json())
  .then(data => this.setState({Lineas : data }));
}

delete = (id) => {
  let params = {
    method: 'DELETE',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  };
  fetch('https://localhost:44338/api/Lineas/' + id, params)
    .then(response => this.componentDidMount())
    .catch(error => console.log(error));
}

  render(){
    const linia = this.state.Lineas.map((fila,index) => {
      return (<Filas key={fila.id} id={fila.id} service={fila.servicio} date={fila.fecha} prices={fila.precio} hojadeservicioId={fila.hojaServicioId} delete={this.delete} />);
    });
    return (
      <table id="table" class="table">
          <tr>
              <th>ID</th>
              <th>Servicio</th>
              <th>Fecha</th>
              <th>Precio</th>
              <th>Hoja de servicio ID</th>
          </tr>
          <tbody>
            {linia}
          </tbody>
      </table>
  );
  }

}

class Linea extends Component
{
    render() {
        return (
                <>
                <Tabla/>
                </>
                );
    }
};

export default Linea;
