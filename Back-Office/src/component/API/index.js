import {getAllDonations, getAllDonationCenters, getAllOpeningDays, getAllUsers,
        deleteDonation, deleteDonationCenter, deleteOpeningDay, deleteDonor,
        addDonor} from './http';


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

const deleteDonationData = async (id) => {
    const data = await deleteDonation(id);
    return data;
};

const deleteDonationCenterData = async (id) => {
    const data = await deleteDonationCenter(id);
    return data;
};

const deleteOpeningDayData = async (id) => {
    const data = await deleteOpeningDay(id);
    return data;
};

const deleteDonorData = async (id) => {
    const data = await deleteDonor(id);
    return data;
};

const addDonorData = async (donor) => {
    const data = await addDonor(donor);
    return data;
};



export {loadDonationData, loadDonationCenterData, loadOpeningDayData, loadUsersData, 
        deleteDonationData, deleteDonationCenterData, deleteOpeningDayData, deleteDonorData,
        addDonorData};

