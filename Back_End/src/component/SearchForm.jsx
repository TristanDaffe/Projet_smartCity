import React from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            donations: this.props.donations,
            donationsToDisplay: this.props.donations,
            inputDate: "",
            inputTime: "",
            inputDonor: "",
            inputDonationType: "",
            inputBloodType: "",
            inputDonationCenter: ""
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
    }

    deleteDonation(event) {
        event.preventDefault();
        this.props.deleteDonation(event.target.value);
    }

    changeValuesToDisplay(string) {
        const donationsToDisplay = this.state.donations;
        const afterFiltering = donationsToDisplay.filter(don => {
            return don.donor.includes(string);
        });
        this.setState({ donationsToDisplay: afterFiltering });
    }

    render() {
        return (
            <div>
                <div className="searchBar">
                <p>Search for a donor:  </p>
                <SearchBar callback={(searchValue) => this.changeValuesToDisplay(searchValue)} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Donor</th>
                            <th>Donation Type</th>
                            <th>Blood type</th>
                            <th>Donation center</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.donationsToDisplay.map((don, index) => {
                            return (
                                <tr key={index}>
                                    <td>{don.date}</td>
                                    <td>{don.time}</td>
                                    <td>{don.donor}</td>
                                    <td>{don.donationType}</td>
                                    <td>{don.bloodType}</td>
                                    <td>{don.donationCenter}</td>
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
                <form>
                    <label >Date:</label>
                    <input type="text"
                        onChange={(event) => {
                            this.setState({ inputDate: event.target.value });
                        }} />
                    <br />
                    <label >Time:</label>
                    <input type="Time"
                        onChange={(event) => {
                            this.setState({ inputTime: event.target.value });
                        }} />
                    <br />
                    <label >Donor:</label>
                    <input type="text"
                        onChange={(event) => {
                            this.setState({ inputDonor: event.target.value });
                        }} />
                    <br />
                    <label >Donation type:</label>
                    <input type="text"
                        onChange={(event) => {
                            this.setState({ inputDonationType: event.target.value });
                        }} />
                    <br />
                    <label >Blood type:</label>
                    <input type="text"
                        onChange={(event) => {
                            this.setState({ inputBloodType: event.target.value });
                        }} />
                    <br />
                    <label >Donation Center:</label>
                    <input type="text"
                        onChange={(event) => {
                            this.setState({ inputDonationCenter: event.target.value });
                        }} />
                    <br />
                    <button onClick={(event) => this.addDonation(event)}>Add</button>
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
        addDonation: (donationObjet) => {
            dispatch({ type: "addDonation", payload: { newDonation: donationObjet } });
        },
        deleteDonation: (id) => {
            dispatch({ type: "deleteDonation", payload: { id: id } });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);