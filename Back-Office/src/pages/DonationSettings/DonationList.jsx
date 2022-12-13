import React from 'react';
import SearchBar from '../../component/SearchBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DropList from '../../component/DropList';
import { loadData } from '../../component/API';

// mettre defaultValue dans le time

class DonationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // donations: this.props.donations,
            // donationsToDisplay: this.props.donations,
            donations: [],
            donationsToDisplay: [],
            filter: "id",
            inputDate: "",
            inputTime: "",
            inputDonor: "",
            inputDonationType: "",
            inputBloodType: "",
            inputDonationCenter: "",
            loading: true,
            error: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                donations: this.props.donations,
                donationsToDisplay: this.props.donations
            });
        }
    }

    componentDidMount() {
        this.setDonations();
    }

    setDonations() {

        this.setState({loading: true, error: false}, async () => {
            try{
                const data = await loadData();
                console.log("data");
                console.log(data);
                this.setState({loading: false, error: false});
                const state = {
                    donations: data,
                    donationsToDisplay: data,
                };
                this.setState(state);
                console.log("state");
                console.log(this.state.donations);
            } catch (error) {
                console.log(error);
                this.setState({loading: false, error: true});
            }
        });

    }

    deleteDonation(event) {
        event.preventDefault();
        this.props.deleteDonation(event.target.value);
    }

    changeValuesToDisplay(string) {
        const donationsToDisplay = this.state.donations;
        const afterFiltering = donationsToDisplay.filter(don => {

            if (this.state.filter === "id") {
                return don.id.toString().includes(string);
            }
            else if (this.state.filter === "date") {
                return don.date.includes(string);
            }
            else if (this.state.filter === "time") {
                return don.time.includes(string);
            }
            else if (this.state.filter === "donor") {
                return don.donor.includes(string);
            }
            else if (this.state.filter === "donationType") {
                return don.donationType.includes(string);
            }
            else if (this.state.filter === "bloodType") {
                return don.bloodType.includes(string);
            }
            else if (this.state.filter === "donationCenter") {
                return don.donationCenter.includes(string);
            }

        });
        this.setState({ donationsToDisplay: afterFiltering });
    }

    changeFilter(string) {
        const newFilter = string;
        this.setState({ filter: newFilter });
    }

    render() {

        return (
            <div>
                <div className="header">
                <Link to={`/`} className='backButtonContainer' >
                        <button className="addBackButton">Back</button>
                    </Link>
                    <h1>Donation Settings</h1>
                    <img
                        className='imgCroixRouge'
                        src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
                        alt="settings" />
                </div>
                <div className="searchBar">
                    <p>Search by :</p>
                    <DropList
                        options={
                            [
                                { value: 'id', label: 'Id', key : 'id' },
                                { value: 'date', label: 'Date', key : 'date' },
                                { value: 'time', label: 'Time', key : 'time' },
                                { value: 'donor', label: 'Donor', key : 'donor' },
                                { value: 'donationType', label: 'Donation type', key : 'donationType' },
                                { value: 'bloodType', label: 'Blood type', key : 'bloodType' },
                                { value: 'donationCenter', label: 'Donation center', key : 'donationCenter' }
                                                               
                            ]
                        }
                        callback={(filter) => this.changeFilter(filter)} ></DropList>
                    <p>Input :</p>
                    <SearchBar callback={(userChoice) => this.changeValuesToDisplay(userChoice)} />
                    <Link to={`/addDonation`} className='addButtonContainer'>
                        <button className="addBackButton">Add Donation</button>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Donor</th>
                            <th>Donation type</th>
                            <th>Blood type</th>
                            <th>Donation center</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {console.log("ALLO")}
                        {console.log(this.state.donationsToDisplay)}
                        {console.log(this.state.donations)}
                        {console.log("PROUT")} */}
                        {this.state.donationsToDisplay.map((don, index) => {
                            return (
                                <tr key={index}>
                                    <td>{don.id}</td>
                                    <td>{don.date}</td>
                                    <td>{don.hour}</td>
                                    <td>{don.user_id}</td>
                                    <td>{don.donation_type_id}</td>
                                    {/* <td>{don.bloodType}</td> */}
                                    <td>{don.donation_center_id}</td>
                                    <td>
                                        <Link to={`/donationUpdate/${don.id}`}>Update</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => this.props.deleteDonation(don.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
        addDonation: (donationObjet) => {
            dispatch({ type: "addDonation", payload: { newDonation: donationObjet } });
        },
        deleteDonation: (id) => {
            dispatch({ type: "deleteDonation", payload: { id: id } });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DonationList);