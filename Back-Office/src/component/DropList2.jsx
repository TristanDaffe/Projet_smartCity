import React from 'react';

class DropList2 extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            result: '',
            callback: props.callback
        };
    }

    handleSelectChange = (event) => {
        this.setState({
            result: event.target.value
        }, () => {
            this.state.callback(this.state.result);
        }
        )

    }



    render() {
        return (
            <div>
                <select onClick={
                (event) => this.handleSelectChange(event)
            }>
                    <option value="id">Id</option>
                    <option value="date">Date</option>
                    <option value="time">Time</option>
                    <option value="donor">Donor</option>
                    <option value="donationType">Donation type</option>
                    <option value="bloodType">Blood type</option>
                    <option value="donationCenter">Donation center</option>
                </select>
            </div>
        );
    }
}

export default DropList2;