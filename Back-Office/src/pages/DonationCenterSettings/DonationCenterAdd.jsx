

import React from 'react';
import CustomModal from '../../component/CustomModal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class DonationCenterAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            phone: "",
            email: "",
            fax: "",
            blood: false,
            platelets: false,
            plasma: false,
            redirect: false,
            
        }
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    toggleModal = () => {
        this.setState({ modal: !this.state.modal });
      };




    render() {


        return (
            <div className='addUpdateForm'>
                <div className="header">
                <Link to={`/donationCenterList`} className='backButtonContainer' >
                        <button className="addBackButton">Back</button>
                    </Link>
                    <h1>Donor Settings</h1>
                    <img
                        className='imgCroixRouge'
                        src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
                        alt="settings" />
                </div>
                <h2>Add donor</h2>
                <form className='addUpdateContainer'>
                    <div className='firstItem'>
                        <label >Login:</label>
                        <input className='addUpdateInput'
                            type="text"
                            onChange={(event) => this.setState({ login: event.target.value.toString() })}
                        />
                    </div>
                    <div className='item'>
                        <label >First name:</label>
                        <input className='addUpdateInput'
                            type="text"
                            onChange={(event) => {
                                this.setState({ firstName: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Last name:</label>
                        <input className='addUpdateInput'
                            type="text"
                            onChange={(event) => {
                                this.setState({ lastName: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Birth date:</label>
                        <input className='addUpdateInput'
                            type="date"
                            onChange={(event) => {
                                this.setState({ birthDate: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >E-mail:</label>
                        <input className='addUpdateInput'
                            type="text"
                            onChange={(event) => {
                                this.setState({ email: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Blood type:</label>
                        <select className='addUpdateInput'
                            defaultValue="none"
                            onChange={(event) => {
                                this.setState({ bloodType: event.target.value });
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
                        <label >password:</label>
                        <input className='addUpdateInput'
                            type="text"
                            onChange={(event) => {
                                this.setState({ password: event.target.value });
                            }} />
                    </div>
                    <div className='lastItem'>
                        <button onClick={(event) => this.addDonor(event)}>Add</button>
                        {/* {this.state.redirect && <Navigate to={"/donorList"} />} */}
                    </div>
                    

                </form>
                {/* <ErrorModal
                        show = {false}
                        handleClose={this.hideModal}
                        header={this.state.header}
                        footer={this.state.footer}
                        desc={this.state.desc}
                    /> */}

                    

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
//         addDonationCenter: (donationCenter) => dispatch({ type: 'ADD_DONATION_CENTER', donationCenter })
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DonationCenterAdd);

export default DonationCenterAdd;