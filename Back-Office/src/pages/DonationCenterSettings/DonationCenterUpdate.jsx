import React from 'react';
import { createPath, Navigate, Link, useParams } from 'react-router-dom';
import { loadDonationCenterData, updateDonationCenterData, loadLocalitiesData } from '../../component/API';
import CustomModal from '../../component/CustomModal';

function withParams(Component) {
    return (props) => { return <Component {...props} params={useParams()} /> };
}

class DonationCenterUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            localitiesOptions : [],
            modal: false,
            header: "",
            body: "",
            modal2: false,
            header2: "",
            body2: "",
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
        }
    }

    componentDidMount() {
        this.getLocalitiesOptions();
        this.getDonationCenter();
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
            body: "Are you sure you want to update this donation center ?",
        });
    }

    getDonationCenter() {
        this.setState({ loading: true, error: false }, async () => {
            let idDonationCenter = this.props.params.id;
            try {
                const data = await loadDonationCenterData(idDonationCenter);
                const state = {
                    name: data.name,
                    phoneNumber: data.phone_number  ,
                    emailAddress: data.email_address,
                    fax: data.fax,
                    streetName: data.street_name,
                    numberInStreet: data.street_number,
                    localityId: data.localityId
                };
                console.log("data");
                console.log(data);

                this.setState(state);

                console.log("this.state updated");
                console.log(this.state);
   
            } catch (error) {
                this.setState({
                    modal2: true,
                    header2: "Error",
                    body2: "Error while loading donation center. Please try again later.",
                });
            }
        });
    }

    updateDonationCenter() {
        this.setState({ loading: true, error: false }, async () => {
            
                const updatedDationCenter = {
                    id: this.state.donactioCenterId,
                    name: this.state.name,
                    phoneNumber: this.state.phoneNumber,
                    emailAddress: this.state.emailAddress,
                    fax: this.state.fax,
                    streetName: this.state.streetName,
                    numberInStreet: this.state.numberInStreet,
                    localityId: this.state.localityId
                };
                this.setState({modal : false});
                const promiss =  updateDonationCenterData(updatedDationCenter);
                promiss.then((data) => {
                    this.setState({
                        modal2: true,
                        header2: "Success",
                        body2: "Donation center updated successfully.",
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
                <h2>Update donation center</h2>
                <form className='addUpdateContainer'>
                    <div className='firstItem'>
                        <label >Name:</label>
                        <input className='addUpdateInput'
                            defaultValue={this.state.name}
                            type="text"
                            onChange={(event) => this.setState({ name: event.target.value.toString() })}
                        />
                    </div>
                    <div className='item'>
                        <label >Phone number:</label>
                        <input className='addUpdateInput'
                            defaultValue={this.state.phoneNumber}
                            type="text"
                            onChange={(event) => {
                                this.setState({ phoneNumber: event.target.value });
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
                        <label >Fax:</label>
                        <input className='addUpdateInput'
                            defaultValue={this.state.fax}
                            type="text"
                            onChange={(event) => {
                                this.setState({ fax: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Street name:</label>
                        <input className='addUpdateInput'
                            defaultValue={this.state.streetName}
                            type="text"
                            onChange={(event) => {
                                this.setState({ streetName: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Number in street:</label>
                        <input className='addUpdateInput'
                            value={this.state.numberInStreet}
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
                    {/* <div className='item'>
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
                    </div>   */}

                    <div className='lastItem'>
                        <button onClick={(event)=> this.handleClick(event)}>Update</button>
                    </div>
                </form>

                {this.state.modal && (
                    <CustomModal
                        modal={this.state.modal}
                        header={this.state.header}
                        body={this.state.body}
                        button={<button onClick={(event) => this.updateDonationCenter(event)} className="btn-modal">
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



export default withParams(DonationCenterUpdate);

