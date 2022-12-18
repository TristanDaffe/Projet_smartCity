import React from 'react';
import { createPath, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { addOpeningDayData } from '../../component/API';
import CustomModal from '../../component/CustomModal';


class DonationTypeAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            redirect: false,
            modal: false,
            header: "",
            body: "",
            modal2: false,
            header2: "",
            body2: "",
            dayLabel: '',
            openingTime: '',
            closingTime: '',
        };
    }

    handleClick(event) {
        event.preventDefault();
        this.setState({
            modal: true,
            header: "Confirmation",
            body: "Are you sure you want to add this opening day ?",
        });
    }

    addOpeningDay() {
        const openingDay = {
            dayLabel: this.state.dayLabel,
            openingTime: this.state.openingTime,
            closingTime: this.state.closingTime,
        };
        this.setState({ modal: false });
        const promiss = addOpeningDayData(openingDay);
        promiss.then((response) => {
            this.setState({ error: false });
            this.setState({ modal2: true });
            this.setState({ header2: "Success" });
            this.setState({ body2: "Opening day successfully added !" });
        }).catch((error) => {
            this.setState({ error: true });
            this.setState({ modal2: true });
            this.setState({ header2: "Error" });
            try {
                this.setState({ body2: error.response.data });
            } catch (error) {
                this.setState({ body2: "An error occured while adding the opening day" });
            }
        });
    }
    render() {
        return (
            <div className='addUpdateForm'>
                <div className="header">
                    <Link to={`/openingDayList`} className='backButtonContainer' >
                        <button className="addBackButton">Back</button>
                    </Link>
                    <h1>Opening day Settings</h1>
                    <img
                        className='imgCroixRouge'
                        src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
                        alt="settings" />
                </div>
                <h2>Add opening day</h2>
                <form className='addUpdateContainer'>
                    <div className='firstItem'>
                        <label >Day label:</label>
                        <select className='addUpdateInput'
                            defaultValue="none"
                            onChange={(event) => {
                                this.setState({ dayLabel: event.target.value });
                            }} >
                            <option value="none" disabled hidden>Choose a week day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday" >Tuesday</option>
                            <option value="Wednesday" >Wednesday</option>
                            <option value="Thursday" >Thursday</option>
                            <option value="Friday" >Friday</option>
                            <option value="Saturday" >Saturday</option>
                            <option value="Sunday" >Sunday</option>

                        </select>
                    </div>
                    <div className='item'>
                        <label >Opening time:</label>
                        <input className='addUpdateInput'
                            type="Time"
                            onChange={(event) => {
                                this.setState({ openingTime: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Closing time:</label>
                        <input className='addUpdateInput'
                            type="Time"
                            onChange={(event) => {
                                this.setState({ closingTime: event.target.value });
                            }} />
                    </div>
                    <div className='lastItem'>
                        <button onClick={(event) => this.handleClick(event)}>Add</button>
                    </div>


                </form>
                {this.state.modal && (
                    <CustomModal
                        modal={this.state.modal}
                        header={this.state.header}
                        body={this.state.body}
                        button={<button onClick={() => this.addOpeningDay()} className="btn-modal">
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
                    <Navigate to={createPath('/openingDayList')} />
                )}


            </div>
        );
    }
}


export default DonationTypeAdd;
