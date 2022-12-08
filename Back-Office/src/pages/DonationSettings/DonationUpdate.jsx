import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

function withParams(Component) {
    return (props) => { return <Component {...props} params={useParams()} /> };
}

// petit probleme avec la date, qui ne s'affiche correctement à l'ouverture de la page

class DonationUpdate extends React.Component {

    constructor(props) {
        super(props);
        const donations = this.props.donations;
        const id = parseInt(this.props.params.id);
        const [donation] = donations.filter(d => d.id === id);
        this.state = {
            id,
            date: donation.date,
            time: donation.time,
            donor: donation.donor,
            donationType: donation.donationType,
            bloodType: donation.bloodType,
            donationCenter: donation.donationCenter,
            redirect: false
        }
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
                <h2>Update donation</h2>
                <form className='addUpdateContainer'>
                    <div className='firstItem'>
                        <label>Id</label>
                        <input type="text"
                            value={this.state.id}
                            onChange={(d) => this.setState({ id: d.target.value })}
                        />
                    </div>
                    <div className="item">
                    <label >Date:</label>
                        <input className='addUpdateInput'
                        defaultValue={this.state.date}
                            type="date"
                            onChange={(event) => this.setState({ inputDate: event.target.value.toString() })}
                        />
                    </div>
                    <div className="item">
                        <label>Time</label>
                        <input className='addUpdateInput'
                            type="Time"
                            value={this.state.time}
                            onChange={(event) => {
                                this.setState({ inputTime: event.target.value });
                            }} />
                    </div>
                    <div className="item">
                        <label>Donor</label>
                        <input type="text"
                            value={this.state.donor}
                            onChange={(d) => this.setState({ donor: d.target.value })}
                        />
                    </div>
                    <div className="item">
                        <label>Donation type</label>
                        <input type="text"
                            value={this.state.donationType}
                            onChange={(d) => this.setState({ donationType: d.target.value })}
                        />
                    </div>
                    <div className="item">
                        <label>Blood type</label>
                        <select className='addUpdateInput'
                            defaultValue={this.state.b}
                            onChange={(event) => {
                                this.setState({ inputBloodType: event.target.value });
                            }} >
                           
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
                    <div className="item">
                        <label>Donation Center</label>
                        <input type="text"
                            value={this.state.donationCenter}
                            onChange={(d) => this.setState({ donationCentre: d.target.value })}
                        />
                    </div>
                    <div className='lastItem'>
                        <button
                            onClick={
                                (d) => this.save(d)
                            }>
                            Save
                        </button>
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

export default withParams(connect(mapStateToProps, mapDispatchToProps)(DonationUpdate));