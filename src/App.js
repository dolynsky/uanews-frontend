import React from "react";
import "./App.css";
import Topic from "./components/Topic";
import Loader from "./components/Loader";
import InfiniteScroll from "react-infinite-scroller";
import moment from "moment";
import "moment/locale/uk";
import axios from "axios";
import UpdateNotification from "./components/UpdateNotification";

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            topics: [],
            hasMoreItems: true,
            showNotification: false
        };
        moment.locale("uk");
        this.onWindowScroll = this.onWindowScroll.bind(this);
        this.loadNewItems = this.loadNewItems.bind(this);
        this.loadItems = this.loadItems.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(this.loadNewItems, 30000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    loadItems(page) {
        console.log("loadItems:", page);
        axios.get(`/api/topics/${page}`).then(res => {
            this.pushItems(res.data);
        });
    }

    loadNewItems() {
        if (!this.state.topics.length) return;
        const lastTimestamp = Math.floor(new Date(this.state.topics[0].date).getTime() / 1000);
        axios.get(`/api/topics/after/${lastTimestamp}`).then(res => {
            this.pushItems(res.data, true);
            if (res.data.length) {
                this.notifyOfNewTopics();
            }
        });
    }

    pushItems(newTopics, toStart = false) {
        if (!newTopics.length) return;
        console.log(`pushItems: ${newTopics.length}`);
        this.setState(prevState => {
            let topics = [...prevState.topics];
            const fTopics = newTopics.filter(topic => !topics.find(el => el._id === topic._id));
            fTopics.forEach(t => (t.isNew = toStart));
            if (toStart) {
                topics = [...fTopics, ...topics];
            } else {
                topics = [...topics, ...fTopics];
            }
            return {
                topics,
                hasMoreItems: newTopics.length === 50
            };
        });
    }

    notifyOfNewTopics() {
        if (window.scrollY > 0) {
            this.setState({
                showNotification: true
            });
            window.addEventListener("scroll", this.onWindowScroll);
        }
    }

    onWindowScroll() {
        if (window.scrollY === 0) {
            this.setState({
                showNotification: false
            });
            window.removeEventListener("scroll", this.onWindowScroll);
        }
    }

    render() {
        return (
            <InfiniteScroll pageStart={0} loadMore={this.loadItems} hasMore={this.state.hasMoreItems} loader={<Loader key="loader" />}>
                <div className="container col-12 col-md-8">
                    {this.state.topics.map(topic => (
                        <Topic key={topic._id} {...topic} />
                    ))}
                </div>
                <UpdateNotification show={this.state.showNotification} />
            </InfiniteScroll>
        );
    }
}

export default App;
