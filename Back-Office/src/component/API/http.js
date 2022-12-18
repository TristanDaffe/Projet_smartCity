import axios from "axios";
import { setToken, getToken } from "../../context/LoginContext";
import DonationCenterList from "../../pages/DonationCenterSettings/DonationCenterList";

const URL_API = `http://192.168.1.56:3001`;

const login = async (login, password) => {
  await axios
    .post(`${URL_API}/user/login`, {
      login: login,
      password: password,
    })
    .then((response) => {
      if (response.data.isAdmin) setToken(response.data.token);
    })
    .catch((error) => {
      throw error;
    });
};

const getAllDonations = async () => {
  return await axios
    .get(`${URL_API}/donation/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getDonationsFromDonor = async (id) => {
  return await axios
    .get(`${URL_API}/donation/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      }, 
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getAllDonationCenters = async () => {
  return await axios
    .get(`${URL_API}/center/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getAllOpeningDays = async () => {
  return await axios
    .get(`${URL_API}/openingday/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getOpeningDaysFromDonationCenter = async (id) => {
    return await axios
        .get(`${URL_API}/center/opening/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};


const getAllUsers = async () => {
  return await axios
    .get(`${URL_API}/user/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const deleteDonation = async (id) => {
  return await axios
    .delete(`${URL_API}/donation/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const deleteDonationCenter = async (id) => {
  return await axios
    .delete(`${URL_API}/center/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const deleteOpeningDay = async (id) => {
  return await axios
    .delete(`${URL_API}/openingday/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const deleteDonor = async (id) => {
  return await axios
    .delete(`${URL_API}/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const addDonor = async (donor) => {
  return await axios
    .post(`${URL_API}/user/register`, donor, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      DonationCenterList.setState({ errorMsg: error.response.data });
      localStorage.setItem("error", error.response.data);
    });
};

export {
  getAllDonations,
  getDonationsFromDonor,
  login,
  getAllDonationCenters,
  getAllOpeningDays,
  getOpeningDaysFromDonationCenter,
  getAllUsers,
  deleteDonation,
  deleteDonationCenter,
  deleteOpeningDay,
  deleteDonor,
  addDonor,
};
