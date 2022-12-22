import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadDonationData, loadDonationCentersData, loadUsersData, updateDonationData } from '../../component/API';
import CustomModal from '../../component/CustomModal';

function withParams(Component) {
    return (props) => { return <Component {...props} params={useParams()} /> };
}

class DonationUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            donationCenters: [],
            donors: [],
            donationId: parseInt(this.props.params.id),
            error: false,
            redirect: false,
            modal: false,
            header: "",
            body: "",
            modal2: false,
            header2: "",
            body2: "",
            time: '',
            date: '',
            donor: '',
            donationType: '',
            donationCentre: '',
        }

    }

    componentDidMount() {
        this.getDonation();
        this.getDonationCenters();
        this.getDonors();
    }

    getDonationCenters() {
        this.setState({ loading: true, error: false }, async () => {
            try {
                const data = await loadDonationCentersData();
                const state = {
                    donationCenters: data.map((locality) => {
                        return (
                            <option key={locality.id} value={locality.id}>
                                {locality.name}
                            </option>
                        );
                    })
                };
                this.setState(state);
                if (data.length === 0) {
                    this.setState({ modal2: true });
                    this.setState({ header2: "No donation" });
                    this.setState({ body2: "No donation found" });
                }
            } catch (error) {
                this.setState({
                    modal2: true,
                    header2: "Error",
                    body2: "An error occured while loading the donation centers",
                });
            }
        });
    }


    getDonation() {
        this.setState({ loading: true, error: false }, async () => {
            try {
                let idDonation = this.state.donationId;
                const data = await loadDonationData(idDonation);
                this.setState({ loading: false, error: false });
                const state = {
                    time: data.hour,
                    date: data.date.substring(0, 10),
                    donor: data.user_id,
                    donationType: data.donation_type_id,
                    donationCentre: data.donation_center_id,
                };
                this.setState(state);
            } catch (error) {
                this.setState({
                    modal2: true,
                    header2: "Error",
                    body2: "An error occured while loading the donation",
                });
            }
        });
    }

    getDonors() {
        this.setState({ loading: true, error: false }, async () => {
            try {
                const userData = await loadUsersData();
                const state = {
                    donors: userData.map((donor) => {
                        return (
                            <option key={donor.id} value={donor.id}>
                                {`${donor.id} - ${donor.first_name} ${donor.last_name}`}
                            </option>
                        );
                    })
                };
                this.setState(state);
                if (userData.length === 0) {
                    this.setState({ modal2: true });
                    this.setState({ header2: "No donor" });
                    this.setState({ body2: "No donor found" });
                }
            } catch (error) {
                this.setState({
                    modal2: true,
                    header2: "Error",
                    body2: "An error occured while loading the donors",
                });
            }
        });
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            modal: true,
            header: "Confirmation",
            body: "Are you sure you want to update this donation ?",
        });
    }

    updateDonation() {
        this.setState({ loading: true, error: false }, async () => {
            try {
                const idDonation = parseInt(this.props.params.id);
                const date = `${this.state.date.toString().substring(0, 4)}/${this.state.date.toString().substring(5,7)}/${this.state.date.toString().substring(8,10)}`;
                const updatedDonationCenter = {
                    id: parseInt(idDonation),
                    hour: this.state.time,
                    date: date,
                    donationTypeId: this.state.donationType,
                    donationCenterId: this.state.donationCentre,
                    userId: this.state.donor,
                };
                console.log(updatedDonationCenter);
                this.setState({modal : false});
                const promisse = updateDonationData(updatedDonationCenter);
                promisse.then(() => {
                    this.setState({
                        modal2: true,
                        header2: "Success",
                        body2: "Donation updated successfully",
                    });
                }).catch((error) => {
                    let errorMSG = "";
                    if (error.response.data !== undefined) {
                        errorMSG = error.response.data;
                    } else {
                        errorMSG = "An error occured while updating the donation center. Please try again later.";
                    }
                    this.setState({
                        modal2: true,
                        header2: "Error",
                        body2: errorMSG,
                    });
                });
            } catch (error) {
                this.setState({
                    modal: false,
                    modal2: true,
                    header2: "Error",
                    body2: "An error occured while updating the donation",
                });
            }
        });
    }

    render() {

        return (
            <div className='addUpdateForm'>
                <div className="header">
                <Link to={`/donorList`} className='backButtonContainer' >
                        <button className="addBackButton">Back</button>
                    </Link>
                    <h1>Donation Settings</h1>
                    <img
                        className='imgCroixRouge'
                        src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
                        alt="settings" />
                </div>
                <h2>Update donation</h2>
                <form className='addUpdateContainer'>
                    <div className="firstItem">
                        <label>Time</label>
                        <input className='addUpdateInput'
                            type="Time"
                            value={this.state.time}
                            onChange={(event) => {
                                this.setState({ time: event.target.value });
                            }} />
                    </div>
                    <div className="item">
                        <label >Date:</label>
                        <input className='addUpdateInput'
                            defaultValue={this.state.date.substring(0, 10)}
                            type="date"
                            onChange={(event) => this.setState({ date: event.target.value.toString() })}
                        />
                    </div>

                    <div className="item">
                        <label>Donor</label>
                        <select className='addUpdateInput'
                            value={this.state.donor}
                            onChange={(event) => {
                                this.setState({ donor: event.target.value });
                            }} >
                            {this.state.donors}
                        </select>
                    </div>

                    <div className='item'>
                        <label >Donation type:</label>
                        <select className='addUpdateInput'
                            value={this.state.donationType}
                            onChange={(event) => {
                                this.setState({ donationType: event.target.value });
                            }} >
                            <option value="1">Whole blood</option>
                            <option value="2">Plasma</option>
                            <option value="3">Platelets</option>
                        </select>
                    </div>
                    <div className="item">
                        <label>Donation Center</label>
                        <select className='addUpdateInput'
                            value={this.state.donationCentre}
                            onChange={(event) => {
                                this.setState({ donationCentre: event.target.value });
                            }} >
                            {this.state.donationCenters}
                        </select>
                    </div>
                    <div className='lastItem'>
                        <button
                            onClick={
                                (event) => this.handleClick(event)
                            }>
                            Save
                        </button>
                    </div>
                </form>
                {this.state.modal && (
                    <CustomModal
                        modal={this.state.modal}
                        header={this.state.header}
                        body={this.state.body}
                        button={<button onClick={(event) => this.updateDonation(event)} className="btn-modal">
                            Confirm
                        </button>}
                        closeButton={<button onClick={() => this.setState({ modal: false })} className="btn-modal">
                            Close
                        </button>}
                    >
                    </CustomModal>
                )}
                {this.state.modal2 && (
                    <CustomModal
                        modal={this.state.modal2}
                        header={this.state.header2}
                        body={this.state.body2}
                        button={<button onClick={() => this.setState({ modal2: false })} className="btn-modal">
                            Close
                        </button>}
                        onClose={() => this.setState({ redirect: true })}
                    >
                    </CustomModal>
                )}
            </div>
        );
    }
}


export default withParams(DonationUpdate);