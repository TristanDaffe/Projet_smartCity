import React from 'react';
import { createPath, Navigate, Link, useParams } from 'react-router-dom';
import { loadUserData, updateDonorData } from '../../component/API';
import CustomModal from '../../component/CustomModal';

function withParams(Component) {
    return (props) => { return <Component {...props} params={useParams()} /> };
}

class DonorUpdate extends React.Component {
        
    constructor(props) {
        super(props);
        this.state = {
            donorId: parseInt(this.props.params.id),
            error: false,
            redirect: false,
            modal: false,
            header: "",
            body: "",
            modal2: false,
            header2: "",
            body2: "",
            lastName: '',
            firstName: '',
            emailAddress: '',
            birthdate: '',
            bloodType: '',
            login: '',
            password: '',
            bloodTypeId: 0,
        }
    }

    componentDidMount() {
        this.getDonor();
    }

    getDonor() {
        this.setState({ loading: true, error: false }, async () => {
            try {
                let idDonor = this.state.donorId;
                const data = await loadUserData(idDonor);
                this.setState({ loading: false, error: false });
                const state = {
                    lastName: data.last_name,
                    firstName: data.first_name,
                    emailAddress: data.email_address,
                    birthdate: data.birthday,
                    bloodType: data.blood_type,
                    login: data.login,
                    password: data.password,
                };
                this.setState(state);
                
            } catch (error) {
                this.setState({ loading: false, error: true });
            }
        });
    }
   
    updateDonor() {
        const birthdate = `${this.state.birthdate.toString().substring(0, 4)}/${this.state.birthdate.toString().substring(5,7)}/${this.state.birthdate.toString().substring(8,10)}`;
        this.setState({ loading: true, error: false }, async () => {
            try {
                const newDonor = {
                    id: this.state.donorId,
                    last_name: this.state.lastName,
                    first_name: this.state.firstName,
                    email_address: this.state.emailAddress,
                    birthday: birthdate,
                    bloodTypeId: this.state.bloodType.id,
                    login: this.state.login,
                    password: this.state.password,
                };
            this.setState({modal : false});
            const promiss = updateDonorData(newDonor);
            promiss.then((response) => {
                this.setState({
                    modal2 : true, 
                    header2: "Success", 
                    body2: "Donor updated successfully",
                    error : false});
            }).catch((error) => {
                let errorMSG = "";
                if (error.response.data !== undefined) {
                    errorMSG = error.response.data;
                } else {
                    errorMSG = "An error occured while updating the donor";
                }
                this.setState({
                    modal2 : true,
                    header2: "Error",
                    body2: errorMSG,
                    error : true});
        });
            } catch (error) {
                this.setState({ loading: false, error: true });
            }
        });
    }

                    

    handleClick(event) {
        event.preventDefault();
        this.setState({
            modal: true,
            header: "Confirmation",
            body: "Are you sure you want to update this donor ?",
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
                <h2>Update donor</h2>
                <form className='addUpdateContainer'>
                    <div className='firstItem'>
                        <label >Login:</label>
                        <input className='addUpdateInput'
                            defaultValue={this.state.login}
                            type="text"
                            onChange={(event) => this.setState({ login: event.target.value })}
                        />
                    </div>
                    <div className='item'>
                        <label >First name:</label>
                        <input className='addUpdateInput'
                            defaultValue={this.state.firstName}
                            type="text"
                            onChange={(event) => {
                                this.setState({ firstName: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Last name:</label>
                        <input className='addUpdateInput'
                            defaultValue={this.state.lastName}
                            type="text"
                            onChange={(event) => {
                                this.setState({ lastName: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Birth date:</label>
                        <input className='addUpdateInput'
                            defaultValue={this.state.birthdate.substring(0, 10)}
                            type="date"
                            onChange={(event) => {
                                this.setState({ birthdate: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >E-mail:</label>
                        <input className='addUpdateInput'
                            defaultValue={this.state.emailAddress}
                            type="text"
                            onChange={(event) => {
                                this.setState({ emailAddress: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Blood type:</label>
                        <select className='addUpdateInput'
                            value= {`${this.state.bloodType.id}`}
                            onChange={(event) => {
                                this.setState({ bloodType: event.target.value });
                            }} >
                            <option value= "1">A+</option>
                            <option value="2">A-</option>
                            <option value="3">B+</option>
                            <option value="4">B-</option>
                            <option value="5">AB+</option>
                            <option value="6">AB-</option>
                            <option value="7">O+</option>
                            <option value="8">O-</option>
                        </select>
                    </div>
                    <div className='item'>
                        <label >password:</label>
                        <input className='addUpdateInput'
                            defaultValue={this.state.password}
                            type="password"
                            onChange={(event) => {
                                this.setState({ password: event.target.value });
                            }} />
                    </div>
                    <div className='lastItem'>
                        <button onClick={(event) => this.handleClick(event)}>Update</button>
                    </div>
                </form>
                {this.state.modal && (
                    <CustomModal
                        modal={this.state.modal}
                        header={this.state.header}
                        body={this.state.body}
                        button={<button onClick={() => this.updateDonor()} className="btn-modal">
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



    export default withParams(DonorUpdate);

