import React from 'react';

class DropList extends React.Component {

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

    options = [
        { value: 'id', label: 'Id' },
        { value: 'date', label: 'Date' },
        { value: 'time', label: 'Time' },
        { value: 'donor', label: 'Donor' },
        { value: 'donationType', label: 'Donation type' },
        { value: 'bloodType', label: 'Blood type' },
        { value: 'donationCenter', label: 'Donation center' }
    ];

    render() {
        return (
            <div>
                <select onClick={
                    (event) => this.handleSelectChange(event)
                }>
                    {this.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                    
                </select>
            </div>
        );
    }
}

export default DropList;