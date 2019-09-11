import React from "react";
import "./App.css";
import dataLoader from "./data/dataLoader";
import Topic from "./components/Topic";

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            filters: ["злочин", "зник"],
            isLoading: true
        };
    }

    async componentDidMount() {
        const topics = await dataLoader();
        this.setState({ topics, isLoading: false });
    }

    checker(topic) {
        for (const filter of this.state.filters) {
            if (topic.Title.includes(filter)) {
                return true;
            }
        }
        return false;
    }

    render() {
        const filtered = this.state.topics.filter(this.checker.bind(this));
        return (
            <div className="container">
                {this.state.isLoading && <div>Loading...</div>}
                {filtered.map(topic => (
                    <Topic key={topic.Id} {...topic} />
                ))}
            </div>
        );
    }
}

export default App;
