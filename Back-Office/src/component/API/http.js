import axios from "axios";
import { setToken, getToken } from "../../context/LoginContext";
import DonationCenterList from "../../pages/DonationCenterSettings/DonationCenterList";

const URL_API = `http://172.1.0.64:3001`;

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

const getOpeningDay = async (id) => {
  return await axios
    .get(`${URL_API}/openingday/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`,
      },
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

const getUser = async (id) => {
  return await axios
    .get(`${URL_API}/user/${id}`, {
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

const getLocalities = async () => {
  return await axios
    .get(`${URL_API}/locality/all`, {
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
      lastName: donor.lastName,
      firstName: donor.firstName,
      emailAddress: donor.emailAddress,
      birthDate: donor.birthDate,
      bloodType: donor.bloodType,
      rhesus: donor.rhesus,
      login: donor.login,
      password: donor.password,
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

const addOpeningDay = async (openingDay) => {
    return await axios
        .post(`${URL_API}/openingday`, openingDay, {
            dayLabel: openingDay.dayLabel,
            openingTime: openingDay.openingTime,
            closingTime: openingDay.closingTime,
            headers: {"Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
            }
            })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

const addDonationCenter = async (donationCenter) => {
  return await axios
    .post(`${URL_API}/center`, donationCenter, {
      name: donationCenter.name,
      phoneNumber: donationCenter.phoneNumber,
      emailAddress: donationCenter.emailAddress,
      fax: donationCenter.fax,
      streetName: donationCenter.streetName,
      numberInStreet: donationCenter.numberInStreet,
      localityId: donationCenter.localityId,
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



const updateOpeningDay = async (openingDay) => {
    return await axios
        .patch(`${URL_API}/openingday`, openingDay, {
            headers: {"Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
            }
            })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
          throw error;
        });
};

const updateDonor = async (donor) => {
  return await axios
    .patch(`${URL_API}/user`, {
      id: donor.id,
      lastName: donor.last_name,
      firstName: donor.first_name,
      emailAddress: donor.email_address,
      birthdate: donor.birthday,
      bloodTypeId: donor.bloodTypeId,
      login: donor.login,
      password: donor.password
    }, {
      headers: {"Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
      }
      })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};


export {
  getAllDonations,
  getDonationsFromDonor,
  login,
  getAllDonationCenters,
  getAllOpeningDays,
  getOpeningDaysFromDonationCenter,
  getOpeningDay,
  getAllUsers,
  getLocalities,
  getUser,
  deleteDonation,
  deleteDonationCenter,
  deleteOpeningDay,
  deleteDonor,
  addDonor,
  addOpeningDay,
  addDonationCenter,
  updateOpeningDay,
  updateDonor,
};
