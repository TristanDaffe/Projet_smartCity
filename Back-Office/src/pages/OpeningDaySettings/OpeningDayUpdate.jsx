import React from 'react';
import { useParams } from 'react-router-dom';
import CustomModal from '../../component/CustomModal';
import { Link } from 'react-router-dom';
import { createPath, Navigate } from 'react-router-dom';
import { loadOpeningDayData, updateOpeningDayData } from '../../component/API';


function withParams(Component) {
    return (props) => { return <Component {...props} params={useParams()} /> };
}

class OpeningDayUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openingDayId: parseInt(this.props.params.id),
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
        }
    }

    componentDidMount() {
        this.getOpeningDay();
    }

    getOpeningDay() {
        this.setState({ loading: true, error: false }, async () => {
            try {
                let idOpeningDay = this.state.openingDayId;
                const data = await loadOpeningDayData(idOpeningDay);
                this.setState({ loading: false, error: false });
                const state = {
                    dayLabel: data.day_label,
                    openingTime: data.opening_time,
                    closingTime: data.closing_time,
                };
                this.setState(state);
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
            body: "Are you sure you want to update this opening day ?",
        });
    }

    updateOpeningDay() {
        const openingDay = {
            id: this.state.openingDayId,
            dayLabel: this.state.dayLabel,
            openingTime: this.state.openingTime,
            closingTime: this.state.closingTime,
        };
        this.setState({ modal: false });
        const promiss = updateOpeningDayData(openingDay);
        promiss.then((response) => {
            this.setState({ error: false });
            this.setState({ modal2: true });
            this.setState({ header2: "Success" });
            this.setState({ body2: "Opening day successfully updated !" });
        }).catch((error) => {
            this.setState({ error: true });
            this.setState({ modal2: true });
            this.setState({ header2: "Error" });
            try {
                this.setState({ body2: error.response.data });
            } catch (error) {
                this.setState({ body2: "An error occured while updating the opening day" });
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
                <h2>Update opening day</h2>
                <form className='addUpdateContainer'>
                    <div className='firstItem'>
                        <label >Day label:</label>
                        <select className='addUpdateInput'
                            defaultValue={this.state.dayLabel}
                            onChange={(event) => {
                                this.setState({ dayLabel: event.target.value });
                            }} >
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
                            value={this.state.openingTime}
                            onChange={(event) => {
                                this.setState({ openingTime: event.target.value });
                            }} />
                    </div>
                    <div className='item'>
                        <label >Closing time:</label>
                        <input className='addUpdateInput'
                            type="Time"
                            value={this.state.closingTime}
                            onChange={(event) => {
                                this.setState({ closingTime: event.target.value });
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
                        button={<button onClick={() => this.updateOpeningDay()} className="btn-modal">
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

export default withParams(OpeningDayUpdate);

