import {
  getAllDonations,
  getAllDonationCenters,
  getAllOpeningDays,
  getAllUsers,
  deleteDonation,
  deleteDonationCenter,
  deleteOpeningDay,
  deleteDonor,
  addDonor,
} from "./http";

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
  const data = await addDonor(donor);
  return data;
};

export {
  loadDonationData,
  loadDonationCenterData,
  loadOpeningDayData,
  loadUsersData,
  deleteDonationData,
  deleteDonationCenterData,
  deleteOpeningDayData,
  deleteDonorData,
  addDonorData,
};
