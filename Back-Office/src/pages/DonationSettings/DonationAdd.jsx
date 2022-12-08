import React from 'react';
import { connect } from 'react-redux';
import { createPath, Navigate, useParams } from 'react-router-dom';



function withParams(Component) {
    return (props) => { return <Component {...props} params={useParams()} /> };
}

class DonationAdd extends React.Component {

    constructor(props) {
        super(props);
        const donations = this.props.donations;
        const id = parseInt(this.props.params.id);
        const [donation] = donations.filter(d => d.id === id);
        this.state = {
            id,
            date: new Date().toISOString().slice(0, 10),
            time: new Date().toISOString().slice(11, 16),
            donor: donation ? donation.donor : "",
            donationType: donation ? donation.donationType : "",
            bloodType: donation ? donation.bloodType : "",
            donationCenter: donation ? donation.donationCenter : "",
            redirect: false
        }
    }

    addDonation(event) {
        event.preventDefault();
        const newDonation = {
            date: this.state.inputDate,
            time: this.state.inputTime,
            donor: this.state.inputDonor,
            donationType: this.state.inputDonationType,
            bloodType: this.state.inputBloodType,
            donationCenter: this.state.inputDonationCenter,
        }
        this.props.addDonation(newDonation);
        this.setState({ redirect: true });
    }


    save(event) {
        event.preventDefault();
        this.props.updateDonation({
            id: this.state.id,
            date: this.state.date,
            time: this.state.time,
            donor: this.state.donor,
            donationType: this.state.donationType,
            bloodType: this.state.bloodType,
            donationCenter: this.state.donationCenter,
        });
        this.setState({ redirect: true });
    }

    render() {



        return (

            <div className='addUpdateForm'>
                <div className="header">
                    <h1>Donation Settings</h1>
                    <img
                        className='imgCroixRouge'
                        src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
                        alt="settings" />
                </div>
                <h2>Add donation</h2>

                <form className='addUpdateContainer'>
                    <div className='firstItem'>
                        <label >Date:</label>
                        <input className='addUpdateInput'
                            type="date"
                            onChange={(event) => this.setState({ inputDate: event.target.value.toString() })}

                        />
                    </div>
                    <div className='item'>
                        <label >Time:</label>
                        <input className='addUpdateInput'
                            type="Time"
                            onChange={(event) => {
                                this.setState({ inputTime: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Donor:</label>
                        <input className='addUpdateInput'
                            type="text"
                            onChange={(event) => {
                                this.setState({ inputDonor: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Donation type:</label>
                        <select className='addUpdateInput'
                            defaultValue="none"
                            onChange={(event) => {
                                this.setState({ inputDonationType: event.target.value });
                            }} >
                            <option value="none" disabled hidden>Choose a donation type</option>
                            <option value="Plasma">Plasma</option>
                            <option value="Platelets">Platelets</option>
                            <option value="Whole blood">Whole blood</option>
                        </select>
                    </div>
                    <div className='item'>
                        <label >Blood type:</label>
                        <select className='addUpdateInput'
                            defaultValue="none"
                            onChange={(event) => {
                                this.setState({ inputBloodType: event.target.value });
                            }} >
                            <option value="none" disabled hidden>Choose a blood type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className='item'>
                        <label >Donation Center:</label>
                        <input className='addUpdateInput'
                            type="text"
                            onChange={(event) => {
                                this.setState({ inputDonationCenter: event.target.value });
                            }} />
                    </div>
                    <div className='lastItem'>
                        <button onClick={(event) => this.addDonation(event)}>Add</button>

                        {this.state.redirect && <Navigate to={"/donationList"} />}
                    </div>
                </form>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        donations: state.donations.listeDonations
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDonation: (donationObjet) => {
            dispatch({ type: "updateDonation", payload: { newDonation: donationObjet } });
        },
        addDonation: (donationObjet) => {
            dispatch({ type: "addDonation", payload: { newDonation: donationObjet } });
        }

    }
};

export default withParams(connect(mapStateToProps, mapDispatchToProps)(DonationAdd));