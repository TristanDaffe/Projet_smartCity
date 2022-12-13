import React from 'react';
import SearchBar from '../../component/SearchBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DropList from '../../component/DropList';
import LinkButton from '../../component/LinkButton';


class DonorList extends React.Component {

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
                <Link to={`/`} className='backButtonContainer' >
                        <button className="addBackButton">Back</button>
                    </Link>
                    <h1>Donors Settings</h1>
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
                                { value: 'name', label: 'Name', key : 'name' },
                                { value: 'description', label: 'Description', key : 'description' },                                   
                        
                            ]
                        }
                        callback={(filter) => this.changeFilter(filter)} ></DropList>
                    <p>Input :</p>
                    <SearchBar callback={(userChoice) => this.changeValuesToDisplay(userChoice)} />
                    <Link to={`/addDonors`} className='addButtonContainer'>
                        <button className="addBackButton">Add Donor</button>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
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

export default DonorList;