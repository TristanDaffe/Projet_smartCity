

import React from 'react';
import { createPath, Navigate } from 'react-router-dom';
import { addDonorData } from '../../component/API';
import CustomModal from '../../component/CustomModal';
import { Link } from 'react-router-dom';

class DonorAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            header: '',
            body: '',
            modal2: false,
            header2: '',
            body2: '',
            error: false,
            redirect: false,
            lastName: '',
            firstName: '',
            emailAddress: '',
            birthdate: '',
            bloodType: '',
            login: '',
            password: '',
        }
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            modal: true,
            header: "Confirmation",
            body: "Are you sure you want to add this donor ?",
        });
    }

    addDonor() {
        const birthdate = `${this.state.birthdate.toString().substring(0, 4)}/${this.state.birthdate.toString().substring(5,7)}/${this.state.birthdate.toString().substring(8,10)}`;
        const donor = {
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            emailAddress: this.state.emailAddress,
            birthdate: birthdate,
            bloodType: this.state.bloodType.substring(0, 1),
            rhesus: this.state.bloodType.substring(1,2),
            login: this.state.login,
            password: this.state.password,
        };
        this.setState({ modal: false });
        const promiss = addDonorData(donor);
        promiss.then(() => {
            this.setState({ error: false });
            this.setState({ modal2: true });
            this.setState({ header2: "Success" });
            this.setState({ body2: "Donor successfully added !" });
        }).catch((error) => {
            this.setState({ error: true });
            this.setState({ modal2: true });
            this.setState({ header2: "Error" });
            try {
                this.setState({ body2: error.response.data });
            } catch (error) {
                this.setState({ body2: "An error occured while adding the donor" });
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
                            onChange={(event) => this.setState({ login: event.target.value })}
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
                                this.setState({ birthdate: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >E-mail:</label>
                        <input className='addUpdateInput'
                            type="text"
                            onChange={(event) => {
                                this.setState({ emailAddress: event.target.value });
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
                            type="password"
                            onChange={(event) => {
                                this.setState({ password: event.target.value });
                            }} />
                    </div>
                    <div className='lastItem'>
                        <button onClick={(event) => this.handleClick(event)}>Add</button>
                        {/* {this.state.redirect && <Navigate to={"/donorList"} />} */}
                    </div>
                </form>
                {this.state.modal && (
                    <CustomModal
                        modal={this.state.modal}
                        header={this.state.header}
                        body={this.state.body}
                        button={<button onClick={() => this.addDonor()} className="btn-modal">
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

                {this.state.redirect && !this.state.error && (
                    <Navigate to={createPath('/donorList')} />
                )}
            </div>
        );
    }
}

export default DonorAdd;

