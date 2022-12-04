import React from 'react';
import { connect } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

function withParams(Component) {
    return (props) => { return <Component {...props} params={useParams()} /> };
}

class AddDonation extends React.Component {

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
        const formStyle = {
            paddingTop: "40px",
        }
        const item = {
            border: "1px solid black",
            display: "flex",
            flexDirection: "row",
            alignItems: "left",
            justifyContent: "center",
            width: "100%",
            padding: "4px",
        };

        const firstItem = {
            border: "1px solid black",
            display: "flex",
            flexDirection: "row",
            alignItems: "left",
            justifyContent: "center",
            width: "100%",
            padding: "4px",
            borderTopLeftRadius: "3px",
            borderTopRightRadius: "3px",
        };

        const lastItem = {
            border: "1px solid black",
            display: "flex",
            flexDirection: "row",
            alignItems: "left",
            justifyContent: "center",
            width: "100%",
            padding: "4px",
            borderBottomLeftRadius: "3px",
            borderBottomRightRadius: "3px",
        };

        const container = {
            border: "6px solid black",
            borderRadius: "10px",
            paddingRight: "10px",
            backgroundColor: "none",
            zIndex: "1",
            position: "relative",
        }

        return (
            
            <div style={formStyle}>
                <div className="header">
                <h1>Donation Settings</h1>
                <img 
                    className='imgCroixRouge' 
                    src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png" 
                    alt="settings" />
                </div>
                <h2>Add donation</h2>

                <form style = {container}>
                    <div style={firstItem}>
                    <label >Date:</label>
                    <input type="text"
                        onChange={(event) => {
                            this.setState({ inputDate: event.target.value });
                        }} />
                    </div>
                    <div style={item}>
                    <label >Time:</label>
                    <input type="Time"
                        onChange={(event) => {
                            this.setState({ inputTime: event.target.value });
                        }} />
                    </div>
                    <div style={item}>
                    <label >Donor:</label>
                    <input type="text"
                        onChange={(event) => {
                            this.setState({ inputDonor: event.target.value });
                        }} />
                    </div>  
                    <div style={item}>
                    <label >Donation type:</label>
                    <input type="text"
                        onChange={(event) => {
                            this.setState({ inputDonationType: event.target.value });
                        }} />
                    </div>
                    <div style={item}>
                    <label >Blood type:</label>
                    <input type="text"
                        onChange={(event) => {
                            this.setState({ inputBloodType: event.target.value });
                        }} />
                    </div>
                    <div style={item}>
                    <label >Donation Center:</label>
                    <input type="text"
                        onChange={(event) => {
                            this.setState({ inputDonationCenter: event.target.value });
                        }} />
                    </div>
                    <div style={lastItem}>
                    <button onClick={(event) => this.addDonation(event)}>Add</button>
                    
                    {this.state.redirect && <Navigate to={"/"} />}
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

export default withParams(connect(mapStateToProps, mapDispatchToProps)(AddDonation));