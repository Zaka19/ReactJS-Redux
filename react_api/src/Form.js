import React,{Component} from 'react';

class FormF extends Component
{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.id,
            servicio : "",
            precio : 0,
            hojaServicioId : 0
        }
    }

    componentDidMount = () =>{
        fetch("https://localhost:44338/api/Lineas/"+this.state.id)
        .then(response => response.json())
        .then(data => this.setState({  
            servicio : data.servicio,
            precio : data.precio,
            hojaServicioId : data.hojaServicioId 
        }));
    }

    change = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }
    
    add = () => {
        if(this.state.id === undefined){
            let params = {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            };
            fetch('https://localhost:44338/api/Lineas', params)
                .then(json =>{ this.setState({
                    servicio : "",
                    precio : 0,
                    hojaServicioId : 0
                })
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
            fetch('https://localhost:44338/api/Lineas/'+this.state.id, params)
                .then(json =>{ this.setState({
                    servicio : "",
                    precio : 0,
                    hojaServicioId : 0
                })
            })
                .catch(error => console.log(error));
        }

    }

    render() {
        return (
                <div>
                    <p>Servicio</p>
                    <input name="servicio" type="text" value={this.state.servicio} onChange={this.change} />
                    <p>Precio</p>
                    <input name="precio" type="number" value={this.state.precio} onChange={this.change} />
                    <p>Hoja de servicio ID</p>
                    <input name="hojaServicioId" type="number" value={this.state.hojaServicioId} onChange={this.change} />
                    <button onClick={this.add}>Submit</button>
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
