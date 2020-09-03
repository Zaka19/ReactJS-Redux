import React from "react";
import ShowLines from './Lineas';
import {
  BrowserRouter as Router,
          Switch,
          Route,
          Link,
          useParams
          } from "react-router-dom";
import Form from "./Form";
export default function Menu() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">ShowLines</Link>
            </li>
            <li>
              <Link to="/add_line">AddLine</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={ShowLines} />
          <Route exact path="/add_line" component={Form} />
          <Route exact path="/edit/:id" component={Edit} />
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
