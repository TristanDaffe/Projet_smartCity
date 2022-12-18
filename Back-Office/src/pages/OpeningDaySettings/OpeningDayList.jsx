import React from 'react';
import SearchBar from '../../component/SearchBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DropList from '../../component/DropList';
import { loadOpeningDaysData, deleteOpeningDayData } from '../../component/API';
import CustomModal from '../../component/CustomModal';


class OpeningDayList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                openingDay: this.props.openingDay,
                openingDayToDisplay: this.props.openingDay
            });
        }
    }

    componentDidMount() {
        this.setOpeningDay();
    }

    setOpeningDay() {
        this.setState({ loading: true, error: false }, async () => {
            try {
                const data = await loadOpeningDaysData();
                this.setState({ loading: false, error: false });
                const state = {
                    openingDay: data,
                    openingDayToDisplay: data,
                };
                this.setState(state);
                if (data.length === 0) {
                    this.setState({ modal2: true });
                    this.setState({ header2: "No opening day" });
                    this.setState({ body2: "No opening day found" });
                }
            } catch (error) {
                this.setState({ modal2: true });
                this.setState({ header2: "Error" });
                this.setState({ body2: error.message });
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
            this.setOpeningDay();
        }).catch((error) => {
            console.log("error dans la view");
            console.log(error);
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
                return op.opening_time.toString().substr(0,5).includes(string);
            }
            else if (this.state.filter === "closing_time") {
                return op.closing_time.toString().substr(0,5).includes(string);
            }
            else {
                return false;
            }

        });

        this.setState({ openingDayToDisplay: afterFiltering });
    }


    render() {
        return (
            <div>
                <div className="header">
                    <Link to={`/welcome`} className='backButtonContainer' >
                        <button className="addBackButton">Back</button>
                    </Link>
                    <h1>Opening Days Settings</h1>
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
                                { value: 'id', label: 'Id', key: 'id' },
                                { value: 'label', label: 'Label', key: 'label' },
                                { value: 'opening_time', label: 'Opening time', key: 'opening_time' },
                                { value: 'closing_time', label: 'Closing time', key: 'closing_time' }
                            ]
                        }
                        callback={(filter) => this.changeFilter(filter)} ></DropList>
                    <p>Input :</p>
                    <SearchBar callback={(userChoice) => this.changeValuesToDisplay(userChoice)} />
                    <Link to={`/addOpeningDay`} className='addButtonContainer'>
                        <button className="addBackButton">Add opening day</button>
                    </Link>
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
                        {this.state.openingDayToDisplay.map((openingDay, index) => {
                            return (
                                <tr key={index}>
                                    <td>{openingDay.id}</td>
                                    <td>{openingDay.day_label}</td>
                                    <td>{openingDay.opening_time.toString().substr(0,5)}</td>
                                    <td>{openingDay.closing_time.toString().substr(0,5)}</td>
                                    <td>
                                        <Link to={`/openingDayUpdate/${openingDay.id}`}>Update</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => this.handleClick(openingDay.id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

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



const mapStateToProps = (state) => {
    return {
        openingDay: state.openingDay
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteDonation: (id) => {
            dispatch({ type: 'deleteOpeningHour', payload: { id: id } })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpeningDayList);
