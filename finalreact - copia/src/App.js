import React from "react";
import ShowPlayers from './ShowPlayers';
import ShowParties from './ShowParties';
import Form from "./Form";
import FormGame from "./FormGame";
import PlayerForm from "./FormAddPlayerGame";
import {
  BrowserRouter as Router,
          Switch,
          Route,
          Link,
          useParams
          } from "react-router-dom";
export default function Menu() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-sm bg-dark">
          <ul className="navbar-nav">
              <li className="nav-link">
                <Link to="/">Show players</Link>
              </li>
              <li className="nav-link">
                <Link to="/add_player">Add player</Link>
              </li>
              <li className="nav-link">
                <Link to="/show_parties">Show parties</Link>
              </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={ShowPlayers} />
          <Route exact path="/show_parties" component={ShowParties} />
          <Route exact path="/add_player" component={Form} />
          <Route exact path="/create/:id" component={Create} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/playerGameadd/:id" component={AddPlayer} />
        </Switch>
      </div>
    </Router>
  );
}

function Edit() {
     
  let {id} = useParams();

  return (
          <Form id={id} />
          );
}

function Create() {
     
  let {id} = useParams();

  return (
          <FormGame id={id} />
          );
}

function AddPlayer() {
     
  let {id} = useParams();

  return (
          <PlayerForm id={id} />
          );
}
