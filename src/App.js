import React from 'react';
import "./App.css"
import BitrateGraph from "./component/BitrateGraph";
import Navbar from "./component/Navbar";
import Login from './component/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const NavBar = () => {
    return(
        <div className="App">
            <Router>
              <Navbar />
                <Switch>
                  <Route path="/Login" component={Login}>
                    <Login />
                  </Route>
                  <Route path="/BitrateGraph" component={BitrateGraph}>
                    <BitrateGraph />
                  </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default NavBar;