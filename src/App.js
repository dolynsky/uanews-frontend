import React from "react";
import "./App.css";
import dataLoader from "./data/dataLoader";

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          topics: []
        }
    }

    componentDidMount() {
      dataLoader();
    }

    render() {
        return <div></div>;
    }
}

export default App;
