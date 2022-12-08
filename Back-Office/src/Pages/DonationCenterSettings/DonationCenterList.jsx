import React from 'react';
import SearchBar from '../../component/SearchBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DropList from '../../component/DropList';
import LinkButton from '../../component/LinkButton';


class DonationCenterList extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     donationCenters: this.props.donationCenters,
        //     redirect: false
        // }
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Donation Centers Settings</h1>
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
                    <Link to={`/addDonationCenter`} className="addButton">
                        <button>Add Donation Center</button>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Donation Center Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    </table>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         donationCenters: state.donationCenters.listeDonationCenters
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addDonationCenter: (donationCenterObjet) => {
//             dispatch({ type: "addDonationCenter", payload: { newDonationCenter: donationCenterObjet } });
//         },
//         deleteDonationCenter: (id) => {
//             dispatch({ type: "deleteDonationCenter", payload: { id: id } });
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DonationCenterList);

export default DonationCenterList;