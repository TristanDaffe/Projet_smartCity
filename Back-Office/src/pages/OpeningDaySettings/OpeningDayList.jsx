import React from 'react';
import SearchBar from '../../component/SearchBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DropList from '../../component/DropList';
import ConfirmationPopup from '../../component/ConfirmationPopup';
import { loadOpeningDayData, deleteOpeningDayData } from '../../component/API';


class OpeningDayList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openingDay: [],
            openingDayToDisplay: [],
            filter: "id",
            loading: true,
            error: false,
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
                const data = await loadOpeningDayData();
                this.setState({ loading: false, error: false });
                const state = {
                    openingDay: data,
                    openingDayToDisplay: data,
                };
                this.setState(state);
            } catch (error) {
                this.setState({ loading: false, error: true });
            }
        });
    }

    deleteOpeningDay(id) {
        try {
            deleteOpeningDayData(id);
            this.setOpeningDay();
        } catch (error) {
            console.log(error);
        }
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
                    <h1>Opening Hours Settings</h1>
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
                                { value: 'label', label: 'Label', key : 'label' },
                                { value: 'opening_time', label: 'Opening time', key : 'opening_time' },
                                { value: 'closing_time', label: 'Closing time', key : 'closing_time'}                                 
                            ]
                        }
                        callback={(filter) => this.changeFilter(filter)} ></DropList>
                    <p>Input :</p>
                    <SearchBar callback={(userChoice) => this.changeValuesToDisplay(userChoice)} />
                    <Link to={`/addOpeningDay`} className='addButtonContainer'>
                        <button className="addBackButton">Add Donation Type</button>
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
                                    <td>{openingDay.opening_time}</td>
                                    <td>{openingDay.closing_time}</td>
                                    <td>
                                        <Link to={`/opationTypeUpdate/${openingDay.id}`}>Update</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => this.deleteOpeningDay(openingDay.id)}>Delete</button>
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
        openingDay: state.openingDay
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteDonation: (id) => {
            dispatch({ type: 'deleteOpeningHour', payload: { id: id }})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OpeningDayList);
