import React from 'react';

class DropList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            options : props.options,
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
                    {this.state.options.map((option) => {
                        return <option 
                        value={option.value}
                        key = {option.key}>{option.label}</option>
                    })}
                </select>
            </div>
        );
    }
}

export default DropList;