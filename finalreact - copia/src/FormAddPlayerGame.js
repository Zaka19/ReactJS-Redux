import React, { Component } from 'react';


class Players extends Component {
    render() {
        return (
            <option value={this.props.id}>{this.props.name}</option>
        );
    }

}

class Filas extends Component {

    delete = () => {
        this.props.delete(this.props.id);
    }

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.email}</td>
                <td>{this.props.nick}</td>
                <td><button className="btn btn-primary" onClick={this.delete}>Delete</button></td>
            </tr>
        );
    }
}

class FormF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            player: [],
            parties: [],
            partyId: parseInt(this.props.id),
            playerId: 0
        }
    }

    componentDidMount = () => {
        fetch("https://localhost:44319/api/Players")
            .then(response => response.json())
            .then(data => this.setState({ player: data }));

        fetch("https://localhost:44319/api/Player_Party")
            .then(response => response.json())
            .then(data => {
                let a = [];
                data.forEach(element => {
                    if (element.partyId == this.state.partyId) {
                        a.push(element);
                    }
                });
                this.setState({
                    parties: a
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
        fetch('https://localhost:44319/api/Player_Party/' + id, params)
            .then(() => {
                this.componentDidMount()
            })
            .catch(error => console.log(error));
    }

    change = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: parseInt(value)
        })
    }

    check() {
        return this.state.parties.find(x => x.playerId == this.state.playerId);;
    }

    add = () => {
        if (this.check() == null) {
            let obj = { partyId: this.state.partyId, playerId: this.state.playerId }
            let params = {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            };
            console.log(this.state);
            fetch('https://localhost:44319/api/Player_Party', params)
                .then(() => this.componentDidMount())
                .then(() => {
                    this.setState({
                        player: [],
                        parties: [],
                        partyId: parseInt(this.props.id),
                        playerId: 0
                    })
                    let success = document.getElementById("success");
                    success.innerHTML = "Created succefully!!!";
                })
                .catch(error => console.log(error));
        }
        else {
            let success = document.getElementById("success");
            success.innerHTML = "The player is already in game!!!";
        }
    }

    render() {

        const players = this.state.player.map((row, index) => {
            return (<Players key={row.id} id={row.id} name={row.name} />)
        });

        const parties = this.state.parties.map((row, index) => {
            if (this.state.player.find(x => x.id === row.playerId) !== undefined) {
                return (<Filas key={row.id} id={row.id} name={this.state.player.find(x => x.id === row.playerId).name} email={this.state.player.find(x => x.id === row.playerId).email} nick={this.state.player.find(x => x.id === row.playerId).nick} delete={this.delete} />)
            }
        });

        return (
            <div>
                <div className="container">
                    <div className="form-group">
                        <label htmlFor="name">Players:</label>
                        <select className="form-control" onChange={this.change} name="playerId" value={this.state.playerId}>
                            <option value="0" disabled="disabled">---</option>
                            {players}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.add} >Submit</button>
                    <div>
                        <p id="success"></p>
                    </div>
                </div>

                <div className="container">
                    <table id="table" className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Nick</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parties}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};

class FormAddPlayerGame extends Component {
    render() {
        return (
            <FormF id={this.props.id} />
        );
    }
}

export default FormAddPlayerGame;
