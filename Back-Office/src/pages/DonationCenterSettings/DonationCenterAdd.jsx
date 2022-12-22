import React from 'react';
import CustomModal from '../../component/CustomModal';
import { Link } from 'react-router-dom';
import { addDonationCenterData, loadLocalitiesData } from '../../component/API';

class DonationCenterAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: "",
            phoneNumber: "",
            emailAddress: "",
            fax: "",
            streetName: "",
            numberInStreet: 0,
            localityId: 0,
            blood: false,
            platelets: false,
            plasma: false,
            redirect: false,
            modal: false,
            header: '',
            body: '',
            modal2: false,
            header2: '',
            body2: '',
            error: false,
        }
    }

    componentDidMount() {
        this.getLocalitiesOptions();
    }

    getLocalitiesOptions() {
        this.setState({ loading: true, error: false }, async () => {
            try {
                const data = await loadLocalitiesData();
                this.setState({ loading: false, error: false });
                const state = {
                    localitiesOptions: data.map((locality) => {
                        return (
                            <option key={locality.id} value={locality.id}>{locality.name}</option>
                        );
                    })
                };
                this.setState(state);
            } catch (error) {
                this.setState({
                    modal2: true,
                    header2: "Error",
                    body2: "Error while loading localities. Please try again later.",
                });
            }
        });
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            modal: true,
            header: "Confirmation",
            body: "Are you sure you want to add this donation center ?",
        });
    }

    addDonationCenter(event) {
        event.preventDefault();
        this.setState({ loading: true, error: false }, async () => {
                const availableDonation = [];
                if (this.state.blood) {
                    availableDonation.push(1);
                }
                if (this.state.platelets) {
                    availableDonation.push(2);
                }
                if (this.state.plasma) {
                    availableDonation.push(3);
                }
                const newDonationCenter = {
                    name: this.state.name,
                    phoneNumber: this.state.phoneNumber,
                    emailAddress: this.state.emailAddress,
                    fax: this.state.fax,
                    streetName: this.state.streetName,
                    numberInStreet: this.state.numberInStreet,
                    localityId: this.state.localityId,
                    availableDonation : availableDonation,
                };
                this.setState({ modal: false });
                const promiss = addDonationCenterData(newDonationCenter);
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
                    this.setState({ body2: "An error occured while adding the donation center" });
                }
                });
            });
    }


    render() {
        return (
            <div className='addUpdateForm'>
                <div className="header">
                <Link to={`/donationCenterList`} className='backButtonContainer' >
                        <button className="addBackButton">Back</button>
                    </Link>
                    <h1>Donation center Settings</h1>
                    <img
                        className='imgCroixRouge'
                        src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
                        alt="settings" />
                </div>
                <h2>Add donation center</h2>
                <form className='addUpdateContainer'>
                    <div className='firstItem'>
                        <label >Name:</label>
                        <input className='addUpdateInput'
                            type="text"
                            onChange={(event) => this.setState({ name: event.target.value.toString() })}
                        />
                    </div>
                    <div className='item'>
                        <label >Phone number:</label>
                        <input className='addUpdateInput'
                            placeholder='0400/00.00.00'
                            type="text"
                            onChange={(event) => {
                                this.setState({ phoneNumber: event.target.value });
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
                        <label >Fax:</label>
                        <input className='addUpdateInput'
                            placeholder='0800 00 000'
                            type="text"
                            onChange={(event) => {
                                this.setState({ fax: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Street name:</label>
                        <input className='addUpdateInput'
                            type="text"
                            onChange={(event) => {
                                this.setState({ streetName: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Number in street:</label>
                        <input className='addUpdateInput'
                            type="number"
                            onChange={(event) => {
                                this.setState({ numberInStreet: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Locality:</label>
                        <select className='addUpdateInput'
                            defaultValue="none"
                            onChange={(event) => {
                                this.setState({ localityId: event.target.value });
                            }} >
                            <option value="none" disabled hidden>   
                                Select a locality
                            </option>
                            {this.state.localitiesOptions}
                        </select>
                    </div>
                    <div className='item'>
                        <label >Blood:</label>
                        <input className='addUpdateInput'
                            onChange={() => {}}
                            checked= {this.state.blood}
                            type="radio"
                            onClick={(event) => {
                                this.state.blood ? this.setState({ blood: false }) : this.setState({ blood: true });
                            }} 
                            />         
                    </div>  
                    <div className='item'>
                        <label >Plasma:</label>
                        <input className='addUpdateInput'
                            onChange={() => {}}
                            checked= {this.state.plasma}
                            type="radio"
                            onClick={(event) => {
                                this.state.plasma ? this.setState({ plasma: false }) : this.setState({ plasma: true });
                            }} 
                            />         
                    </div>  
                    <div className='item'>
                        <label >Platelets:</label>
                        <input className='addUpdateInput'
                            onChange={() => {}}
                            checked= {this.state.platelets}
                            type="radio"
                            onClick={(event) => {
                                this.state.platelets ? this.setState({ platelets: false }) : this.setState({ platelets: true });
                            }} 

                            />         
                    </div>  

                    <div className='lastItem'>
                        <button onClick={(event)=> this.handleClick(event)}>Add</button>
                    </div>
                </form>

                {this.state.modal && (
                    <CustomModal
                        modal={this.state.modal}
                        header={this.state.header}
                        body={this.state.body}
                        button={<button onClick={(event) => this.addDonationCenter(event)} className="btn-modal">
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


export default DonationCenterAdd;