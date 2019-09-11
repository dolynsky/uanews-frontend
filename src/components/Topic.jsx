import React from "react";
import "./Topic.css";
import Moment from "react-moment";

export default class Topic extends React.PureComponent {
    render() {
        return (
            <div className="topic border-bottom border-gray">
                <div>{this.props.Title}</div>
                <Moment locale="ru">{this.props.DateCreated*1000}</Moment>
            </div>
        );
    }
}
