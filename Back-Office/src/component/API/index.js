import {
  getAllDonations,
  getDonationsFromDonor,
  getAllDonationCenters,
  getAllOpeningDays,
  getOpeningDaysFromDonationCenter,
  getAllUsers,
  deleteDonation,
  deleteDonationCenter,
  deleteOpeningDay,
  deleteDonor,
  addDonor,
} from "./http";

const loadDonationData = async () => {
  try {
    const data = await getAllDonations();
    return data;
  } catch (error) {
    throw error;
  }
};

const loadDonationCenterData = async () => {
  try {
    const data = await getAllDonationCenters();
    return data;
  } catch (error) {
    throw error;
  }
};

const loadDonationFromDonorData = async (id) => {
  try {
    const data = await getDonationsFromDonor(id);
    return data;
  } catch (error) {
    throw error;
  }
};

const loadOpeningDayData = async () => {
  try {
    const data = await getAllOpeningDays();
    return data;
  } catch (error) {
    throw error;
  }
};

const loadOpeningDayFromDonationCenterData = async (id) => {
  try {
    const data = await getOpeningDaysFromDonationCenter(id);
    return data;
  } catch (error) {
    throw error;
  }
};

const loadUsersData = async () => {
  try {
    const data = await getAllUsers();
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteDonationData = async (id) => {
  try {
    const data = await deleteDonation(id);
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteDonationCenterData = async (id) => {
  try {
    const data = await deleteDonationCenter(id);
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteOpeningDayData = async (id) => {
  try {
    const data = await deleteOpeningDay(id);
    return data;
  } catch (error) {
    throw error;
  }
};

const deleteDonorData = async (id) => {
  try {
    const data = await deleteDonor(id);
    return data;
  } catch (error) {
    throw error;
  }
};

const addDonorData = async (donor) => {
  try {
    const data = await addDonor(donor);
    return data;
  } catch (error) {
    throw error;
  }
};

export {
  loadDonationData,
  loadDonationFromDonorData,
  loadDonationCenterData,
  loadOpeningDayData,
  loadOpeningDayFromDonationCenterData,
  loadUsersData,
  deleteDonationData,
  deleteDonationCenterData,
  deleteOpeningDayData,
  deleteDonorData,
  addDonorData,
};
