

import React from 'react';
import CustomModal from '../../component/CustomModal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addDonationCenterData, loadLocalitiesData } from '../../component/API';

class DonationCenterAdd extends React.Component {

    constructor(props) {
        super(props);
        const {selectedOptions} = this.props;
        this.state = {
            loading: false,
            error: false,
                localitiesOptions: null,
            name: "",
            address: "",
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
                this.setState({ loading: false, error: true });
                console.log(error);
            }
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
                                console.log(this.state.blood);
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
                                console.log(this.state.platelets);
                            }} 

                            />         
                    </div>  

                    <div className='lastItem'>
                        <button onClick={(event)=> this.test}>Add</button>
                    </div>
                </form>

                    

            </div>
        );
    }
}


export default DonationCenterAdd;