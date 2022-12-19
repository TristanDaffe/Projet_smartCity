import React from 'react';

// function withParams(Component) {
//     return (props) => { return <Component {...props} params={useParams()} /> };
// }

class DonationCenterUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            phone: "",
            email: "",
            redirect: false
        }
    }

    addDonationCenter(event) {
        event.preventDefault();
        const newDonationCenter = {
            name: this.state.inputName,
            address: this.state.inputAddress,
            phone: this.state.inputPhone,
            email: this.state.inputEmail,
        }
        this.props.addDonationCenter(newDonationCenter);
        this.setState({ redirect: true });
    }

    render() {

        return (
            <div className="DonationCenterAdd">
                <h1>Add Donation Center</h1>
                <form onSubmit={(event) => this.addDonationCenter(event)}>
                    <label>Name:</label>
                    <input type="text" name="name" onChange={(event) => this.setState({ inputName: event.target.value })} />
                    <label>Address:</label>
                    <input type="text" name="address" onChange={(event) => this.setState({ inputAddress: event.target.value })} />
                    <label>Phone:</label>
                    <input type="text" name="phone" onChange={(event) => this.setState({ inputPhone: event.target.value })} />
                    <label>Email:</label>
                    <input type="text" name="email" onChange={(event) => this.setState({ inputEmail: event.target.value })} />
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}



export default DonationCenterUpdate;

