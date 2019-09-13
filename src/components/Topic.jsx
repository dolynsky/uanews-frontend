import React from "react";
import "./Topic.css";
import moment from "moment";
import Rating from "./Rating";

export default class Topic extends React.PureComponent {
    handleClick() {
        window.open(this.props.url, "_blank");
    }

    render() {
        const { date, region, title, titleMatches, contentMatches, isNew } = this.props;

        const m = moment(date);
        var isCurrentDate = m.isSame(new Date(), "day");
        const timeString = isCurrentDate ? m.format("HH:mm") : m.format("D MMMM");
        const rating = Math.min(titleMatches + Math.max(contentMatches - 2, 0), 3);

        return (
            <div className={`topic ${isNew && "topic-new"}`} onClick={this.handleClick.bind(this)}>
                <div className="topic-info">
                    <div className="time pr-2">
                        <i className="far fa-clock time pr-1"></i>
                        {timeString}
                    </div>
                    <span className="region">{region}</span>
                </div>
                <div className="topic-title">
                    {title}
                    <Rating value={rating} />
                </div>
            </div>
        );
    }
}
