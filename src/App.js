import React from "react";
import "./App.css";
import Topic from "./components/Topic";
import Loader from "./components/Loader";
import InfiniteScroll from "react-infinite-scroller";
import moment from "moment";
import "moment/locale/uk";
import axios from "axios";

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            hasMoreItems: true
        };
        moment.locale("uk");
    }

    loadItems(page) {
        console.log("loadItems:", page);
        axios.get(`/api/topics/${page}`)
        .then(res => {
            const newTopics = res.data;
            this.setState(prevState => {
                const topics = [...prevState.topics];
                newTopics.forEach(topic => {
                    if (!topics.find(el => el._id === topic._id)) {
                        topics.push(topic);
                    }
                });
                return {
                    topics,
                    hasMoreItems: newTopics.length === 50
                }
            })
        })
    }

    render() {
        return (
            <InfiniteScroll pageStart={0} loadMore={this.loadItems.bind(this)} hasMore={this.state.hasMoreItems} loader={<Loader />}>
                <div className="container col-12 col-md-8">
                    {this.state.topics.map(topic => (
                        <Topic key={topic._id} {...topic} />
                    ))}
                </div>
            </InfiniteScroll>
        );
    }
}

export default App;
