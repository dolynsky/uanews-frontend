import React, { Component } from "react";
import "./Rating.css";

class Rating extends Component {
    render() {
        const { value } = this.props;
        const stars = [1,2,3].map(v => <span className={`fa fa-star pr-1 ${value>=v && 'checked'}`}></span>)
        return (
            <div className="stars">
                {stars}
            </div>
        );
    }
}

export default Rating;
