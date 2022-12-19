import {
  getAllDonations,
  getDonationsFromDonor,
  getAllDonationCenters,
  getAllOpeningDays,
  getOpeningDaysFromDonationCenter,
  getOpeningDay,
  getAllUsers,
  deleteDonation,
  deleteDonationCenter,
  deleteOpeningDay,
  deleteDonor,
  addDonor,
  addOpeningDay,
  updateOpeningDay,
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

const loadOpeningDaysData = async () => {
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

const loadOpeningDayData = async (id) => {
  try {
    const data = await getOpeningDay(id);
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

const addOpeningDayData = async (openingDay) => {
  try {
    const data = await addOpeningDay(openingDay);
    return data;
  } catch (error) {
    throw error;
  }
};

const updateOpeningDayData = async (openingDay) => {
  try {
    const data = await updateOpeningDay(openingDay);
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
  loadOpeningDaysData,
  loadOpeningDayFromDonationCenterData,
  loadUsersData,
  deleteDonationData,
  deleteDonationCenterData,
  deleteOpeningDayData,
  deleteDonorData,
  addDonorData,
  addOpeningDayData,
  updateOpeningDayData,
};
