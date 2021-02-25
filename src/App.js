import React from 'react';
import Header from "./components/Header.js";
import Appheader from "./components/Appheader"
import Store from "./pages/Store.js";
import Cart from "./pages/Cart.js";
import Cartpage from "./pages/Cartpage"
import UserForm from './components/UserForm'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";

function App() {
  return (
    <Router>
      <>
        <Appheader/>
        {/*<UserForm/>*/}
        <Switch>
          <Route path="/cartpage">
            <Cartpage />
          </Route>
          <Route path="/register">
            <UserForm />
          </Route>
          <Route path="/">
            <Store />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
