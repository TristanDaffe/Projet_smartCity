import {configureStore} from '@reduxjs/toolkit';

const listeOpeningHours = [
    {}
]



const liste = [
    {
        id: 1,
        date: "2020-01-01",
        time : "10:00",
        donor : "Daffe Tristan",
        donationType : "Plasma",
        bloodType : "O+",
        donationCenter : "Centre de don de sang de Paris",
    },
    {
        id: 2,
        date : "12/03/2022",
        time : "12:00",
        donor : "Daffe Tristan",
        donationType : "Plasma",
        bloodType : "O+",
        donationCenter : "Centre de don de sang de Chatelet",
    },
    {
        id: 3,
        date : "04/05/2022",
        time : "10:00",
        donor : "Dieudonné Nicolas",
        donationType : "Blood",
        bloodType : "A+",
        donationCenter : "Centre de don de sang de Namur",
    },
    {
        id: 4,
        date : "04/05/2022",
        time : "13:00",
        donor : "Goffinet Flavien",
        donationType : "Blood",
        bloodType : "B-",
        donationCenter : "Centre de don de sang de Charleroi",
    },
    {
        id: 5,
        date : "06/11/2022",
        time : "08:00",
        donor : "Daffe Tristan",
        donationType : "Blood",
        bloodType : "O+",
        donationCenter : "Centre de don de sang de Charleroi",
    },
    {
        id: 6,
        date : "22/01/2022",
        time : "10:00",
        donor : "Rousseau Benjamin",
        donationType : "Plasma",
        bloodType : "A-",
        donationCenter : "Centre de don de sang de Paris",
    },
    {
        id: 7,
        date : "12/03/2022",
        time : "12:00",
        donor : "Rousseau Benjamin",
        donationType : "Plasma",
        bloodType : "A-",
        donationCenter : "Centre de don de sang de Chatelet",
    },
    {
        id: 8,
        date : "04/05/2022",
        time : "10:00",
        donor : "Dieudonné Nicolas",
        donationType : "Blood",
        bloodType : "A+",
        donationCenter : "Centre de don de sang de Namur",
    },
    {
        id: 9,
        date : "04/05/2022",
        time : "13:00",
        donor : "Goffinet Flavien",
        donationType : "Blood",
        bloodType : "B-",
        donationCenter : "Centre de don de sang de Charleroi",
    },
    {
        id: 10,
        date : "06/11/2022",
        time : "08:00",
        donor : "Daffe Tristan",
        donationType : "Blood",
        bloodType : "O+",
        donationCenter : "Centre de don de sang de Charleroi",
    },
    {
        id: 11,
        date : "22/01/2022",
        time : "10:00",
        donor : "Daffe Tristan",
        donationType : "Plasma",
        bloodType : "O+",
        donationCenter : "Centre de don de sang de Paris",
    },
    {
        id: 12,
        date : "12/03/2022",
        time : "12:00",
        donor : "Daffe Tristan",
        donationType : "Plasma",
        bloodType : "O+",
        donationCenter : "Centre de don de sang de Chatelet",
    },
    {
        id: 13,
        date : "04/05/2022",
        time : "10:00",
        donor : "Dieudonné Nicolas",
        donationType : "Blood",
        bloodType : "A+",
        donationCenter : "Centre de don de sang de Namur",
    },
    {
        id: 14,
        date : "04/05/2022",
        time : "13:00",
        donor : "Goffinet Flavien",
        donationType : "Blood",
        bloodType : "B-",
        donationCenter : "Centre de don de sang de Charleroi",
    },
    {
        id: 15,
        date : "06/11/2022",
        time : "08:00",
        donor : "Daffe Tristan",
        donationType : "Blood",
        bloodType : "O+",
        donationCenter : "Centre de don de sang de Charleroi",
    },
    {
        id: 16,
        date : "22/01/2022",
        time : "10:00",
        donor : "Rousseau Benjamin",
        donationType : "Plasma",
        bloodType : "A-",
        donationCenter : "Centre de don de sang de Paris",
    },
    {
        id: 17,
        date : "12/03/2022",
        time : "12:00",
        donor : "Rousseau Benjamin",
        donationType : "Plasma",
        bloodType : "A-",
        donationCenter : "Centre de don de sang de Chatelet",
    },
    {
        id: 18,
        date : "04/05/2022",
        time : "10:00",
        donor : "Dieudonné Nicolas",
        donationType : "Blood",
        bloodType : "A+",
        donationCenter : "Centre de don de sang de Namur",
    },
    {
        id: 19,
        date : "04/05/2022",
        time : "13:00",
        donor : "Goffinet Flavien",
        donationType : "Blood",
        bloodType : "B-",
        donationCenter : "Centre de don de sang de Charleroi",
    },
    {
        id: 20,
        date : "06/11/2022",
        time : "08:00",
        donor : "Daffe Tristan",
        donationType : "Blood",
        bloodType : "O+",
        donationCenter : "Centre de don de sang de Charleroi",
    }
];

const donationReducer = (state = {listeDonations: liste}, action) => {
    const listeDonations = state.listeDonations;
    const newArray = [...listeDonations];
    switch (action.type) {
        case "updateDonation":
            const updatedDonation = action.payload.newDonation;
            const index = newArray.findIndex(don => don.id === updatedDonation.id);
            newArray[index] = updatedDonation;
            return {
                listeDonations: newArray
            }
        case "addDonation":
            const newDonation = action.payload.newDonation;
            newDonation.id = newArray.length + 1;
            newArray.push(newDonation);
            return {
                listeDonations: newArray
            }
        case "deleteDonation":
            const id = action.payload.id;
            const index2 = newArray.findIndex(don => don.id === id);
            newArray.splice(index2, 1);
            return {
                listeDonations: newArray
            }

        default:
            return state;
    }
};


const openingHoursReducer = (state = {openingHours: listeOpeningHours}, action) => {
    const openingHours = state.openingHours;
    const newArray = [...openingHours];
    switch (action.type) {
        case "updateOpeningHours":
            const updatedOpeningHours = action.payload.newOpeningHours;
            const index = newArray.findIndex(oh => oh.id === updatedOpeningHours.id);
            newArray[index] = updatedOpeningHours;
            return {
                openingHours: newArray
            }
        case "addOpeningHours":
            const newOpeningHours = action.payload.newOpeningHours;
            newOpeningHours.id = newArray.length + 1;
            newArray.push(newOpeningHours);
            return {
                openingHours: newArray
            }
        case "deleteOpeningHour":
            const id = action.payload.id;
            const index2 = newArray.findIndex(oh => oh.id === id);
            newArray.splice(index2, 1);
            return {
                openingHours: newArray
            }
            
        default:
            return state;
    }
};


const store = configureStore({reducer: {donations: donationReducer, openingHours: openingHoursReducer}});

export default store;