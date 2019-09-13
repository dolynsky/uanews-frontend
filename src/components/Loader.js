import React from "react";

export default class Loader extends React.PureComponent {
    render() {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
}
