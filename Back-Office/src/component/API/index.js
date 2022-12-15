import {getAllDonations, getAllDonationCenters, getAllOpeningDays, getAllUsers} from './http';


const loadDonationData = async () => {
    const data = await getAllDonations();
    return data;
};

const loadDonationCenterData = async () => {
    const data = await getAllDonationCenters();
    return data;
};

const loadOpeningDayData = async () => {
    const data = await getAllOpeningDays();
    return data;
};

const loadUsersData = async () => {
    const data = await getAllUsers();
    return data;
};


export {loadDonationData, loadDonationCenterData, loadOpeningDayData, loadUsersData};

