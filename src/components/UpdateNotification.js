import React, { Component } from "react";
import "./UpdateNotification.css";
import { animateScroll } from "react-scroll";

class UpdateNotification extends Component {
    handleClick() {
        animateScroll.scrollToTop();
    }

    render() {
        console.log(this.props.show);
        return (
            <div className={`update-notification ${!this.props.show && "hidden"}`} onClick={this.handleClick}>
                З'явилися свіжі новини
            </div>
        );
    }
}

export default UpdateNotification;
