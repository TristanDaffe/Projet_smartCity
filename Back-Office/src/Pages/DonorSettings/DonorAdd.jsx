

import React from 'react';
import { connect } from 'react-redux';

// function withParams(Component) {
//     return (props) => { return <Component {...props} params={useParams()} /> };
// }

class DonorAdd extends React.Component {
    
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

        addDonor(event) {
            event.preventDefault();
            const newDonor = {
                name: this.state.inputName,
                address: this.state.inputAddress,
                phone: this.state.inputPhone,
                email: this.state.inputEmail,
            }
            this.props.addDonor(newDonor);
            this.setState({ redirect: true });
        }

        render() {

            return (

                <div className="DonorAdd">
                    <h1>Add Donor</h1>
                    <form onSubmit={(event) => this.addDonor(event)}>
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

    // const mapStateToProps = (state) => {
    //     return {
    //         donationCenters: state.donationCenters
    //     }
    // }

export default DonorAdd;

