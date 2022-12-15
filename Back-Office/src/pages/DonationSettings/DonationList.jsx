import React from 'react';
import SearchBar from '../../component/SearchBar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DropList from '../../component/DropList';
import { loadDonationData, deleteDonationData } from '../../component/API';

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
                const data = await loadDonationData();
                this.setState({loading: false, error: false});
                const state = {
                    donations: data,
                    donationsToDisplay: data,
                };
                this.setState(state);
            } catch (error) {
                this.setState({loading: false, error: true});
            }
            console.log(this.state.donations);
        });

    }

    deleteDonation(id) {
        deleteDonationData(id);
        this.setDonations();
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
                <Link to={`/welcome`} className='backButtonContainer' >
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
                        
                        {this.state.donationsToDisplay.map((don, index) => {
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
                                        <button onClick={() => this.deleteDonation(don.id)}>Delete</button>
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
        donations: state.donations
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

// import React from 'react';
// import SearchBar from '../../component/SearchBar';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import DropList from '../../component/DropList';
// import { loadData } from '../../component/API';

// // mettre defaultValue dans le time

// class DonationList extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             // donations: this.props.donations,
//             donationsToDisplay: this.props.donations,
//             filter: "id",
//             inputDate: "",
//             inputTime: "",
//             inputDonor: "",
//             inputDonationType: "",
//             inputBloodType: "",
//             inputDonationCenter: "",
//             loading: true,
//             error: false,
//         }
//     }

//     componentDidUpdate(prevProps) {
//         if (this.props !== prevProps) {
//             this.setState({
//                 donations: this.props.donations,
//                 donationsToDisplay: this.props.donations
//             });
//         }
//     }

//     componentDidMount() {
//         this.setDonations();
//     }

//     setDonations() {
//         this.setState({loading: true, error: false}, async () => {
//             try{
//                 const data = await loadData();
//                 this.setState({donations: data.donations, donationsToDisplay: data.donations});
//                 this.setState({loading: false});
//             } catch (error) {
//                 this.setState({loading: false, error: true});
//             }
//         });

//     }


//     addDonation(event) {
//         event.preventDefault();
//         const newDonation = {
//             date: this.state.inputDate,
//             time: this.state.inputTime,
//             donor: this.state.inputDonor,
//             donationType: this.state.inputDonationType,
//             bloodType: this.state.inputBloodType,
//             donationCenter: this.state.inputDonationCenter,
//         }
//         this.props.addDonation(newDonation);
//     }

//     deleteDonation(event) {
//         event.preventDefault();
//         this.props.deleteDonation(event.target.value);
//     }

//     changeValuesToDisplay(string) {
//         const donationsToDisplay = this.state.donations;
//         const afterFiltering = donationsToDisplay.filter(don => {

//             if (this.state.filter === "id") {
//                 return don.id.toString().includes(string);
//             }
//             else if (this.state.filter === "date") {
//                 return don.date.includes(string);
//             }
//             else if (this.state.filter === "time") {
//                 return don.time.includes(string);
//             }
//             else if (this.state.filter === "donor") {
//                 return don.donor.includes(string);
//             }
//             else if (this.state.filter === "donationType") {
//                 return don.donationType.includes(string);
//             }
//             else if (this.state.filter === "bloodType") {
//                 return don.bloodType.includes(string);
//             }
//             else if (this.state.filter === "donationCenter") {
//                 return don.donationCenter.includes(string);
//             }

//         });
//         this.setState({ donationsToDisplay: afterFiltering });
//     }

//     changeFilter(string) {
//         const newFilter = string;
//         this.setState({ filter: newFilter });
//     }

//     render() {

//         return (
//             <div>
//                 <div className="header">
//                 <Link to={`/`} className='backButtonContainer' >
//                         <button className="addBackButton">Back</button>
//                     </Link>
//                     <h1>Donation Settings</h1>
//                     <img
//                         className='imgCroixRouge'
//                         src="https://i.pinimg.com/originals/64/11/f0/6411f0dd5a67d583c81851b1c355833f.png"
//                         alt="settings" />
//                 </div>
//                 <div className="searchBar">
//                     <p>Search by :</p>
//                     <DropList
//                         options={
//                             [
//                                 { value: 'id', label: 'Id', key : 'id' },
//                                 { value: 'date', label: 'Date', key : 'date' },
//                                 { value: 'time', label: 'Time', key : 'time' },
//                                 { value: 'donor', label: 'Donor', key : 'donor' },
//                                 { value: 'donationType', label: 'Donation type', key : 'donationType' },
//                                 { value: 'bloodType', label: 'Blood type', key : 'bloodType' },
//                                 { value: 'donationCenter', label: 'Donation center', key : 'donationCenter' }
                                                               
//                             ]
//                         }
//                         callback={(filter) => this.changeFilter(filter)} ></DropList>
//                     <p>Input :</p>
//                     <SearchBar callback={(userChoice) => this.changeValuesToDisplay(userChoice)} />
//                     <Link to={`/addDonation`} className='addButtonContainer'>
//                         <button className="addBackButton">Add Donation</button>
//                     </Link>
//                 </div>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Id</th>
//                             <th>Date</th>
//                             <th>Time</th>
//                             <th>Donor</th>
//                             <th>Donation type</th>
//                             <th>Blood type</th>
//                             <th>Donation center</th>
//                             <th>Update</th>
//                             <th>Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.donationsToDisplay.map((don, index) => {
//                             return (
//                                 <tr key={index}>
//                                     <td>{don.id}</td>
//                                     <td>{don.date}</td>
//                                     <td>{don.time}</td>
//                                     <td>{don.donor}</td>
//                                     <td>{don.donationType}</td>
//                                     <td>{don.bloodType}</td>
//                                     <td>{don.donationCenter}</td>
//                                     <td>
//                                         <Link to={`/donationUpdate/${don.id}`}>Update</Link>
//                                     </td>
//                                     <td>
//                                         <button onClick={() => this.props.deleteDonation(don.id)}>Delete</button>
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         donations: state.donations.listeDonations
//     }
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addDonation: (donationObjet) => {
//             dispatch({ type: "addDonation", payload: { newDonation: donationObjet } });
//         },
//         deleteDonation: (id) => {
//             dispatch({ type: "deleteDonation", payload: { id: id } });
//         }
//     }
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DonationList);