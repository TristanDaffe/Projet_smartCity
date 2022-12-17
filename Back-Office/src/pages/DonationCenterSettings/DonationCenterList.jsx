import React from 'react';
import SearchBar from '../../component/SearchBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DropList from '../../component/DropList';
import { loadDonationCenterData, deleteDonationCenterData } from '../../component/API/index';
import CustomModal from '../../component/CustomModal';


class DonationCenterList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            donationCenters: [],
            donationCentersToDisplay: [],
            loading: true,
            error: false,
            donationCenterToDeleteId: null,
            modal: false,
            header: "",
            body: "",
            modal2: false,
            header2: "",
            body2: "",
        }
    }

    componentDidMount() {
        this.setDonationCenters();
    }

    setDonationCenters() {
        this.setState({ loading: true, error: false }, async () => {
            try {
                const data = await loadDonationCenterData();
                this.setState({ loading: false, error: false });
                const state = {
                    donationCenters: data,
                    donationCentersToDisplay: data,
                };
                this.setState(state);
            } catch (error) {
                this.setState({ loading: false, error: true });
            }
        });
    }

    handleClick = (newDonationCenterToDeleteid) => {
        this.setState({ donationCenterToDeleteId: newDonationCenterToDeleteid });
        this.setState({ modal: true });
        this.setState({ header: "Confirmation" });
        this.setState({ body: "Are you sure you want to delete this donation center?" });
    }


    deleteDonationCenter() {
        const promesse = deleteDonationCenterData(this.state.donationCenterToDeleteId);
        this.setState({ modal: false });
        promesse.then(() => {
            this.setDonationCenters();
        }).catch((error) => {
            this.setState({ modal2: true });
            this.setState({ header2: "Error" });
            this.setState({ body2: error.response.data });
        });

    }

    changeFilter(filter) {
        this.setState({ filter: filter });
    }

    changeValuesToDisplay(string) {
        const donationCentersToDisplay = this.state.donationCenters;
        const afterFiltering = donationCentersToDisplay.filter(donCent => {

            if (this.state.filter === "id") {
                return donCent.id.toString().includes(string);
            }
            else if (this.state.filter === "name") {
                return donCent.name.includes(string);
            }
            else if (this.state.filter === "address") {
                return `${donCent.street_number} ${donCent.street_name} - ${donCent.locality_name}`.includes(string);
            }
            else if (this.state.filter === "phone") {
                let phone = " ";
                if (donCent.phone_number !== null) {
                    phone = donCent.phone_number;
                }
                return phone.includes(string);
            }
            else if (this.state.filter === "email") {
                let email = " ";
                if (donCent.email_address !== null) {
                    email = donCent.email_address;
                }
                return email.includes(string);
            }
            else if (this.state.filter === "fax") {
                return donCent.fax.includes(string);
            }
            else if (this.state.filter === "blood") {
                return this.centerHasBloodDonation(donCent);
            }
            else if (this.state.filter === "plasma") {
                console.log(this.centerHasPlasmaDonation(donCent));
                return this.centerHasPlasmaDonation(donCent);
            }
            else if (this.state.filter === "platelets") {
                return this.centerHasPlateletsDonation(donCent);
            }
            else {
                return false;
            }
        });
        this.setState({ donationCentersToDisplay: afterFiltering });
    }

    centerHasBloodDonation(donationCenter) {
        for (let i = 0; i < donationCenter.donationTypeAvailable.length; i++) {
            if (donationCenter.donationTypeAvailable[i].name === "Blood") {
                return true;
            }
        }
    }

    centerHasPlasmaDonation(donationCenter) {
        for (let i = 0; i < donationCenter.donationTypeAvailable.length; i++) {
            if (donationCenter.donationTypeAvailable[i].name === "Plasma") {
                return true;
            }
        }
    }

    centerHasPlateletsDonation(donationCenter) {
        for (let i = 0; i < donationCenter.donationTypeAvailable.length; i++) {
            if (donationCenter.donationTypeAvailable[i].name === "Platelets") {
                return true;
            }
        }
    }

    render() {
        return (
            <div>
                <div className="header">
                    <Link to={`/welcome`} className='backButtonContainer' >
                        <button className="addBackButton">Back</button>
                    </Link>
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
                                { value: "id", label: "Id", key: "id" },
                                { value: "name", label: "Name", key: "name" },
                                { value: "address", label: "Address", key: "address" },
                                { value: "phone", label: "Phone", key: "phone" },
                                { value: "email", label: "E-mail", key: "email" },
                                { value: "fax", label: "Fax", key: "fax" },
                                { value: "blood", label: "Blood", key: "blood" },
                                { value: "plasma", label: "Plasma", key: "plasma" },
                                { value: "platelets", label: "Platelets", key: "platelets" },
                            ]
                        }
                        callback={(filter) => this.changeFilter(filter)} ></DropList>
                    <p>Input :</p>
                    <SearchBar callback={(userChoice) => this.changeValuesToDisplay(userChoice)} />
                    <Link to={`/addDonationCenter`} className='addButtonContainer'>
                        <button className="addBackButton">Add Donation center</button>
                    </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>E-mail</th>
                            <th>Fax</th>
                            <th>Blood</th>
                            <th>Plasma</th>
                            <th>Platelets</th>
                            <th>Opening days</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.donationCentersToDisplay.map((donationCenter, index) => (
                            <tr key={index}>
                                <td>{donationCenter.id}</td>
                                <td>{donationCenter.name}</td>
                                <td>{`${donationCenter.street_number} ${donationCenter.street_name} - ${donationCenter.locality_name}`}</td>
                                <td>{donationCenter.phone_number ? donationCenter.phone_number : "/"}</td>
                                <td>{donationCenter.email_address ? donationCenter.email_address : "/"}</td>
                                <td>{donationCenter.fax}</td>
                                <td>{this.centerHasBloodDonation(donationCenter) ? "✅" : "❌"}</td>
                                <td>{this.centerHasPlasmaDonation(donationCenter) ? "✅" : "❌"}</td>
                                <td>{this.centerHasPlateletsDonation(donationCenter) ? "✅" : "❌"}</td>
                                <td><Link to={`/donationCenterOpeningDays/${donationCenter.id}`}>
                                    Go to
                                </Link></td>
                                <td><Link to={`/editDonationCenter/${donationCenter.id}`}>
                                    Update
                                </Link></td>
                                <td><button className="deleteBackButton" value={donationCenter.id} onClick={(event) => this.handleClick(donationCenter.id)}>Delete</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                {this.state.modal && (
                    <CustomModal
                        modal={this.state.modal}
                        header={this.state.header}
                        body={this.state.body}
                        button={<button onClick={() => this.deleteDonationCenter()} className="btn-modal">
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
                        button={<button onClick={(event) => this.setState({ modal2: false })} className="btn-modal">
                            Close
                        </button>}
                    >
                    </CustomModal>
                )}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        donationCenters: state.donationCenters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDonationCenter: (donationCenterObjet) => {
            dispatch({ type: "addDonationCenter", payload: { newDonationCenter: donationCenterObjet } });
        },
        deleteDonationCenter: (id) => {
            dispatch({ type: "deleteDonationCenter", payload: { id: id } });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DonationCenterList);
