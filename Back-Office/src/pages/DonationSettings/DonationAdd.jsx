import React from 'react';
import CustomModal from '../../component/CustomModal';
import { Link } from 'react-router-dom';
import { loadDonationCentersData, loadUsersData, addDonationData } from '../../component/API';

class DonationAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            donationCenters: [],
            donors: [],
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
            body: "Are you sure you want to add this donation ?",
        });
    }

    addDonation(event) {
        event.preventDefault();
        this.setState({ loading: true, error: false }, async () => {
            try {
                const newDonation = {
                    date : this.state.date,
                    hour : this.state.time,
                    donationTypeId : parseInt(this.state.donationType),
                    donationCenterId : parseInt(this.state.donationCentre),
                    userId : parseInt(this.state.donor),
                }
                console.log(newDonation);
                this.setState({modal: false});
                const promiss = addDonationData(newDonation);
                promiss.then(() => {
                    this.setState({ error: false });
                    this.setState({ modal2: true });
                    this.setState({ header2: "Success" });
                    this.setState({ body2: "Donation center successfully added !" });
                }).catch((error) => {
                    this.setState({ error: true });
                    this.setState({ modal2: true });
                    this.setState({ header2: "Error" });
                try {
                    this.setState({ body2: error.response.data });
                } catch (error) {
                    this.setState({ body2: "An error occured while adding the donation" });
                }
                });
            } catch (error) {
                this.setState({ error: true });
                this.setState({ modal2: true });
                this.setState({ header2: "Error" });
                this.setState({ body2: "An error occured while adding the donation" });
            }
        });
    }




    render() {

        return (
            <div className='addUpdateForm'>
                <div className="header">
                <Link to={`/donationList`} className='backButtonContainer' >
                        <button className="addBackButton">Back</button>
                    </Link>
                    <h1>Donation Settings</h1>
                    <img
                        className='imgCroixRouge'
                        src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
                        alt="settings" />
                </div>
                <h2>Add donation</h2>

                <form className='addUpdateContainer'>
                    <div className="firstItem">
                        <label>Time</label>
                        <input className='addUpdateInput'
                            type="Time"
                            onChange={(event) => {
                                this.setState({ time: event.target.value });
                            }} />
                    </div>
                    <div className="item">
                        <label >Date:</label>
                        <input className='addUpdateInput'
                            defaultValue="none"
                            type="date"
                            onChange={(event) => this.setState({ date: event.target.value.toString() })}
                        />
                    </div>

                    <div className="item">
                        <label>Donor</label>
                        <select className='addUpdateInput'
                            defaultValue="none"
                            onChange={(event) => {
                                this.setState({ donor: event.target.value });
                            }} >
                                <option value="none" disabled hidden>Select a donor</option>
                            {this.state.donors}
                        </select>
                    </div>

                    <div className='item'>
                        <label >Donation type:</label>
                        <select className='addUpdateInput'
                            defaultValue="none"
                            onChange={(event) => {
                                this.setState({ donationType: event.target.value });
                            }} >
                            <option value="none" disabled hidden>Select a donation type</option>
                            <option value="1">Whole blood</option>
                            <option value="2">Plasma</option>
                            <option value="3">Platelets</option>
                        </select>
                    </div>
                    <div className="item">
                        <label>Donation Center</label>
                        <select className='addUpdateInput'
                            defaultValue="none"
                            onChange={(event) => {
                                this.setState({ donationCentre: event.target.value });
                            }} >
                            <option value="none" disabled hidden>Select a donation center</option>
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
                        button={<button onClick={(event) => this.addDonation(event)} className="btn-modal">
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



export default DonationAdd;