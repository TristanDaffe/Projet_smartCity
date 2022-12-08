import React from "react";

class InputDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            callback: props.callback
        }
    }

    changeDate(event) {
        this.setState({ date: event.target.value }, () => {
            this.state.callback(this.state.date);
        });
    }

    render() {
        return (
            <input
                type="date"
                locale="en-GB"
                value={this.state.date}
                onChange={
                    (event) => this.changeDate(event)
                } />);
    }
}

export default InputDate;