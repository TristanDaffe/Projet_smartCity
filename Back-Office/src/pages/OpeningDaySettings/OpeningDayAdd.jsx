import React from 'react';
import { connect } from 'react-redux';
import { createPath, Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';



function withParams(Component) {
    return (props) => { return <Component {...props} params={useParams()} /> };
}

class DonationTypeAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            donationType: {
                name: '',
                description: '',
                isDeleted: false
            },
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { donationType } = this.state;
        this.setState({
            donationType: {
                ...donationType,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { donationType } = this.state;
        const { dispatch } = this.props;
        
    }

    render() {
        const { donationType, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Add Donation Type</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !donationType.name ? ' has-error' : '')}>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" value={donationType.name} onChange={this.handleChange} />
                        {submitted && !donationType.name &&
                            <div className="help-block">Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !donationType.description ? ' has-error' : '')}>
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" name="description" value={donationType.description} onChange={this.handleChange} />
                        {submitted && !donationType.description &&
                            <div className="help-block">Description is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Add</button>
                        
                    </div>
                </form>
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     const { donationTypes } = state;
//     return {
//         donationTypes
//     };
// }

// const connectedDonationTypeAdd = connect(mapStateToProps)(DonationTypeAdd);
// export { connectedDonationTypeAdd as DonationTypeAdd };


export default DonationTypeAdd;
