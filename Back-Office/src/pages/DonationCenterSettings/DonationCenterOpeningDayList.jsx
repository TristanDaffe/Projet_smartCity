import React from 'react';
import SearchBar from '../../component/SearchBar';
import { Link, useParams } from 'react-router-dom';
import DropList from '../../component/DropList';
import { loadOpeningDayFromDonationCenterData, deleteOpeningDayData } from '../../component/API';
import CustomModal from '../../component/CustomModal';
import Pagination from 'react-paginate'

function withParams(Component) {
    return (props) => { return <Component {...props} params={useParams()} /> };
}

class DonationCenterOpeningDayList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            itemsPerPage: 10,

            donationCenterId : parseInt(this.props.params.id),
            openingDay: [],
            openingDayToDisplay: [],
            filter: "id",
            loading: true,
            error: false,
            openingDayToDeleteId: null,
            modal: false,
            header: "",
            body: "",
            modal2: false,
            header2: "",
            body2: "",
        }
    }

    componentDidMount() {
        this.setOpeningDays();
    }

    setOpeningDays() {
        this.setState({ loading: true, error: false }, async () => {
            try {
                let idDonationCenter = this.state.donationCenterId;
                const data = await loadOpeningDayFromDonationCenterData(idDonationCenter);
                this.setState({ loading: false, error: false });
                const state = {
                    openingDay: data,
                    openingDayToDisplay: data,
                };
                this.setState(state);
                if (data.length === 0) {
                    this.setState({ modal2: true });
                    this.setState({ header2: "No opening day" });
                    this.setState({ body2: "There is no opening day for this donation center" });
                }
            } catch (error) {
                this.setState({ modal2: true });
                this.setState({ header2: "Error" });
                this.setState({ body2: error.response.data });
            }
        });
    }

    handleClick = (newOpeningDayToDeleteId) => {
        this.setState({ openingDayToDeleteId: newOpeningDayToDeleteId });
        this.setState({ modal: true });
        this.setState({ header: "Confirmation" });
        this.setState({ body: "Are you sure you want to delete this opening day ?" });
    }

    deleteOpeningDay() {
        const promesse = deleteOpeningDayData(this.state.openingDayToDeleteId);
        promesse.then(() => {
            this.setOpeningDays();
        }).catch((error) => {
            this.setState({ modal2: true});
            this.setState({ header2: "Error" });
            this.setState({ body2: error.response.data });
        }).finally(() => {
            this.setState({ modal: false });
        });
    }



    changeFilter(string) {
        const newFilter = string;
        this.setState({ filter: newFilter });
    }

    changeValuesToDisplay(string) {
        const openingDayToDisplay = this.state.openingDay;
        const afterFiltering = openingDayToDisplay.filter(op => {

            if (this.state.filter === "id") {
                return op.id.toString().includes(string);
            }
            else if (this.state.filter === "label") {
                return op.day_label.includes(string);
            }
            else if (this.state.filter === "opening_time") {
                return op.opening_time.includes(string);
            }
            else if (this.state.filter === "closing_time") {
                return op.closing_time.includes(string);
            }
            else {
                return false;
            }

        });

        this.setState({ openingDayToDisplay: afterFiltering });
    }


    render() {
        const { currentPage, itemsPerPage } = this.state;
        const displayedData = this.state.openingDayToDisplay.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
        
        return (
            <div>
                <div className="header">
                    <Link to={`/donationCenterList`} className='backButtonContainer' >
                        <button className="addBackButton">Back</button>
                    </Link>
                    <h1>Donation Center Settings</h1>
                    <img
                        className='imgCroixRouge'
                        src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
                        alt="settings" />
                    
                </div>
                <h2>Opening Day List</h2>
                <div className="searchBar">
                    <p>Search by :</p>
                    <DropList
                        options={
                            [
                                { value: 'id', label: 'Id', key: 'id' },
                                { value: 'label', label: 'Label', key: 'label' },
                                { value: 'opening_time', label: 'Opening time', key: 'opening_time' },
                                { value: 'closing_time', label: 'Closing time', key: 'closing_time' }
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
                            <th>Label</th>
                            <th>Opening hour</th>
                            <th>Closing hour</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map((openingDay, index) => {
                            return (
                                <tr key={index}>
                                    <td>{openingDay.id}</td>
                                    <td>{openingDay.day_label}</td>
                                    <td>{openingDay.opening_time}</td>
                                    <td>{openingDay.closing_time}</td>
                                    <td>
                                        <Link to={`/opationTypeUpdate/${openingDay.id}`}>Update</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => this.handleClick(openingDay.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="pagination">
                <Pagination
                    pageCount={Math.ceil(this.state.openingDay.length / itemsPerPage)}
                    onPageChange={this.handlePageChange}
                    currentPage={currentPage}
                    />
                </div>

                {this.state.modal && (
                    <CustomModal
                        modal={this.state.modal}
                        header={this.state.header}
                        body={this.state.body}
                        button={<button onClick={() => this.deleteOpeningDay()} className="btn-modal">
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
                    >
                    </CustomModal>
                )}
            </div>
        );
    }
}

export default withParams(DonationCenterOpeningDayList);
