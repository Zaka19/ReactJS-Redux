import React,{Component} from 'react';

class Form extends Component
{
    constructor(props){
        super(props);
        this.state.service = "";
        this.state.price = "";
        this.state.hsid = "";
    }

    change = (event) =>{
        const {name,value} = event.target;
        this.state({
            [name]: value
        });
    }

    add = () => {
        let linea = { servicio: this.state.service,precio: this.state.precio,hojaServicioId: this.state.hsid};
        let params = {
            method: 'POST',
            body: JSON.stringify(linea),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };
        fetch('https://localhost:44338/api/Lineas', params)
            .then(response => response.json())
            .then(json => this.setState({
                service = "",
                price = "",
                hsid = ""
            }))
            .catch(error => console.log(error));
    }
    render() {
        return (
             <div>
                 <p>Servicio:</p>
                 <input name="service" type="text" onChange={this.change} />
                 <p>Precio:</p>
                 <input name="price" type="num" onChange={this.change} />
                 <p>Hoja de servicio ID:</p>
                 <input name="hsid"  type="num" onChange={this.change} />
                 <button name="btn" onClick={this.add} />
             </div>  
                );
    }
}

  


export default Form;
