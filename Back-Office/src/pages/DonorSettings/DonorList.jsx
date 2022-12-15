import React from 'react';
import SearchBar from '../../component/SearchBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DropList from '../../component/DropList';
import { loadUsersData, deleteDonorData } from '../../component/API';
import CustomModal from '../../component/CustomModal';


class DonorList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: 'id',
            donors: [],
            donorsToDisplay: [],
            userChoice: '',
            loading: true,
            error: false,
            modal: false,
            header: "",
            body: "",
    }
    }

    componentDidMount() {
        this.getDonors();
    }

    getDonors() {
        this.setState({loading: true, error: false}, async () => {
        try{
            const data = await loadUsersData();
            this.setState({loading: false, error: false});
            const state = {
                donors: data,
                donorsToDisplay: data,
            };
            this.setState(state);
        } catch (error) {
            this.setState({loading: false, error: true});
        }
    });

    }

    changeFilter(filter) {
        this.setState({ filter: filter });
    }

    changeValuesToDisplay(string) {
        const donorsToDisplay = this.state.donors;
        const afterFiltering = donorsToDisplay.filter(donor => {
            if (this.state.filter === "id") {
                return donor.id.toString().includes(string);
            }
            if (this.state.filter === "name") {
                return donor.first_name.includes(string);
            }
            if (this.state.filter === "lastname") {
                return donor.last_name.includes(string);
            }
            if (this.state.filter === "email") {
                return donor.email_address.includes(string);
            }
            if (this.state.filter === "bloodtype") {
                return `${donor.type}${donor.rhesus}`.includes(string);
            }
            if (this.state.filter === "birthdate") {
                return donor.birthday.substr(0,10).includes(string);
            }
        });
        this.setState({donorsToDisplay: afterFiltering});
    }

    deleteDonor(id) {
        try {
            deleteDonorData(id);
            this.getDonors();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div>
                <div className="header">
                <Link to={`/welcome`} className='backButtonContainer' >
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
                                { value: 'lastname', label: 'Last name', key : 'last name' },
                                { value: 'email', label: 'E-mail', key : 'email' },
                                { value: 'bloodtype', label: 'Blood type', key : 'blood type' },
                                { value: 'birthdate', label: 'Birth date', key : 'birth date' },                                              
                            ]
                        }
                        callback={(filter) => this.changeFilter(filter)} ></DropList>
                    <p>Input :</p>
                    <SearchBar callback={(userChoice) => this.changeValuesToDisplay(userChoice)} />
                    <Link to={`/addDonor`} className='addButtonContainer'>
                        <button className="addBackButton">Add Donor</button>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Last name</th>
                            <th>E-mail</th>
                            <th>Blood type</th>
                            <th>Birth date</th>
                            <th>Donations</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.donorsToDisplay.map((donor, index) => {
                            return (
                                <tr key={index}>
                                    <td>{donor.id}</td>
                                    <td>{donor.first_name}</td>
                                    <td>{donor.last_name}</td>
                                    <td>{donor.email_address}</td>
                                    <td>{`${donor.type}${donor.rhesus}`}</td>
                                    <td>{donor.birthday.substr(0,10) }</td>
                                    <td>todo</td>
                                    <td><Link to={`/donorUpdate/${donor.id}`}>Update</Link> </td>
                                    <td><button className="deleteButton" onClick={() => this.deleteDonor(donor.id)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </table>
                    {this.state.modal && (
                    <CustomModal
                        modal={this.state.modal}
                        header={this.state.header}
                        body={this.state.body}
                        button={<button onClick={() => this.setState({modal : false})} className="btn-modal">
                            Close
                        </button>}
                    >
                    </CustomModal>

                )}
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