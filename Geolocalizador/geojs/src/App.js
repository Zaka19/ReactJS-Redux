import React,{Component} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

class Geolocalizador extends Component
{
 constructor(props){
  super(props);

  this.state = {
    latitud: null,
    longitud: null
  };
}

localizado = (posicion) => {
  this.setState({
    latitud:posicion.coords.latitude,
    longitud:posicion.coords.longitude
  });
}

componentDidMount(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(this.localizado);
  }
}

      render(){
        return(
          <div>
            <h1>Geolocalizador</h1>
            <p>Latitud: {this.state.latitud}</p>
            <p>Longitud: {this.state.longitud}</p>
          </div>
        );
      }
}

class App extends Component
{
    render() {
        return (
                <Geolocalizador/>
                );
    }
};

export default App;
