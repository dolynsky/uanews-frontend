import React from "react";
import "./Topic.css";
import moment from "moment";
import Rating from "./Rating";

export default class Topic extends React.PureComponent {
    render() {
        const { date, region, url, title, titleMatches, contentMatches } = this.props;

        const m = moment(date);
        var isCurrentDate = m.isSame(new Date(), "day");
        const timeString = isCurrentDate ? m.format("HH:mm") : m.format("D MMMM");
        const rating = Math.min(titleMatches + Math.max(contentMatches - 2, 0), 3);

        return (
            <div className="topic">
                <div className="topic-info">
                    <div className="time pr-2">
                        <i className="far fa-clock time pr-1"></i>
                        {timeString}
                    </div>
                    <span className="region">{region}</span>
                </div>
                <div className="topic-title">
                    <a className="" href={url}>
                        {`${title} (${titleMatches}, ${contentMatches}, ${rating})`}
                        <Rating value={rating}/>
                    </a>
                </div>
            </div>
        );
    }
}
