
import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./Redux/configStore";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "./Component/index";
const store = configureStore();
class App extends Component {
  render() {
    return (

        <Provider store={store}>
            <Router>
                <Home />
            </Router>
        </Provider>
    );
  }
}

export default App;