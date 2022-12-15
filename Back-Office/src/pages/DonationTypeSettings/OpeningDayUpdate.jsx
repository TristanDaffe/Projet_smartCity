import React from 'react';
import { connect } from 'react-redux';

// function withParams(Component) {
//     return (props) => { return <Component {...props} params={useParams()} /> };
// }

class DonationTypeUpdate extends React.Component {
        
        constructor(props) {
            super(props);
            const donationTypes = this.props.donationTypes;
            const id = parseInt(this.props.params.id);
            const [donationType] = donationTypes.filter(d => d.id === id);
            this.state = {
                id,
                name: donationType ? donationType.name : "",
                redirect: false
            }
        }
        
        updateDonationType(event) {
            event.preventDefault();
            this.props.updateDonationType({
                id: this.state.id,
                name: this.state.name,

            });
            this.setState({ redirect: true });
        }

        render() {
            return (
                <div>
                    <h1>Update Donation Type</h1>
                    <form onSubmit={this.updateDonationType.bind(this)}>
                        <label>Donation Type Name</label>
                        <input type="text" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} />
                        <button type="submit">Update</button>
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

    // const mapDispatchToProps = (dispatch) => {
    //     return {
    //         addDonationCenter: (donationCenter) => dispatch(addDonationCenter(donationCenter))
    //     }
    // }
    
    // export default connect(null, mapDispatchToProps)(DonationCenterAdd);

    export default DonationTypeUpdate;

