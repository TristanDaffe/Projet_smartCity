import React from 'react';
import SearchBar from '../../component/SearchBar';
import { Link, useParams } from 'react-router-dom';
import DropList from '../../component/DropList';
import { loadDonationFromDonorData, deleteDonationData } from '../../component/API';
import CustomModal from '../../component/CustomModal';
import Pagination from 'react-paginate'

function withParams(Component) {
    return (props) => { return <Component {...props} params={useParams()} /> };
}

class DonorDonationList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            itemsPerPage: 10,
            donorId : parseInt(this.props.params.id),
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
            donationToDeleteId: null,
            modal: false,
            header: "",
            body: "",
            modal2: false,
            header2: "",
            body2: "",
        }
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page.selected });
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
        this.getDonations();
    }

    getDonations() {
        this.setState({loading: true, error: false}, async () => {
            try{
                let idDonnor = this.state.donorId;
                const data = await loadDonationFromDonorData(idDonnor);
                this.setState({loading: false, error: false});
                const state = {
                    donations: data,
                    donationsToDisplay: data,
                    
                };
                this.setState(state);
                if (data.length === 0) {
                    this.setState({modal2: true});
                    this.setState({header2: "No donation"});
                    this.setState({body2: "This donor has no donation"});
                }
            } catch (error) {
                this.setState({loading: false, error: true});
                this.setState({ modal2: true });
                this.setState({ header2: "Error" });
                this.setState({ body2: error.message });
            }
        });

    }
        
    handleClick(newDonationToDeleteId) {
        this.setState({
            donationToDeleteId: newDonationToDeleteId,
            modal: true,
            header: "Confirmation",
            body: "Are you sure you want to delete this donation ?",
        });
    }

    deleteDonation() {
        const promesse = deleteDonationData(this.state.donationToDeleteId);
        promesse.then((response) => {
            this.setState({ modal: false });
            this.getDonations();

    }).catch((error) => {
        this.setState({ modal2: true });
        this.setState({ header2: "Error" });
        this.setState({ body2: error.response.data });
    });
        
    
    }

    changeValuesToDisplay(string) {
        const donationsToDisplay = this.state.donations;
        const afterFiltering = donationsToDisplay.filter(don => {

            if (this.state.filter === "id") {
                return don.id.toString().includes(string);
            }
            else if (this.state.filter === "date") {
                return don.date.substr(0,10).includes(string);
            }
            else if (this.state.filter === "time") {
                return don.hour.includes(string);
            }
            else if (this.state.filter === "donor") {
                return `${don.user_id} ${don.first_name} ${don.last_name}`.includes(string);
            }
            else if (this.state.filter === "donationType") {
                return don.name.includes(string);
            }
            else if (this.state.filter === "bloodType") {
                return `${don.blood_type_name}${don.blood_type_rhesus}`.includes(string);
            }
            else if (this.state.filter === "donationCenter") {
                return don.donation_center_name.includes(string);
            }
            else {
                return false;
            }
        });
        this.setState({ donationsToDisplay: afterFiltering });
    }

    changeFilter(string) {
        const newFilter = string;
        this.setState({ filter: newFilter });
    }

    render() {
        const { currentPage, itemsPerPage } = this.state;
        const displayedData = this.state.donationsToDisplay.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
        
        return (
            <div>
                <div className="header">
                <Link to={`/donorList`} className='backButtonContainer' >
                        <button className="addBackButton">Back</button>
                    </Link>
                    <h1>Donor Settings</h1>
                    <img
                        className='imgCroixRouge'
                        src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
                        alt="settings" />
                </div>
                <h2>Donations</h2>
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
                        
                        {displayedData.map((don, index) => {
                            return (
                                <tr key={index}>
                                    <td>{don.id}</td>
                                    <td>{don.date.substr(0,10)}</td>
                                    <td>{don.hour}</td>
                                    <td>{`${don.user_id} ${don.first_name} ${don.last_name}`}</td>
                                    <td>{don.name}</td>
                                    <td>{`${don.blood_type_name}${don.blood_type_rhesus}`}</td>
                                    <td>{don.donation_center_name}</td>
                                    <td>
                                        <Link to={`/donationUpdate/${don.id}`}>Update</Link>
                                    </td>
                                    <td>
                                        <button onClick={(event) => this.handleClick(don.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="pagination">
                    <Pagination
                        pageCount={Math.ceil(this.state.donations.length / itemsPerPage)}
                        onPageChange={this.handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
                {this.state.modal && (
                    <CustomModal
                        modal={this.state.modal}
                        header={this.state.header}
                        body={this.state.body}
                        button={<button onClick={(event) => this.deleteDonation()} className="btn-modal">
                            Confirm
                        </button>}
                        closeButton={<button onClick={(event) => this.setState({ modal: false })} className="btn-modal">
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


export default withParams(DonorDonationList);
