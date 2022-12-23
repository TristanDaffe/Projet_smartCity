import axios from "axios";
import { setToken, getToken } from "../../context/LoginContext";

const URL_API = `http://192.168.1.54:3001`;
const VERSION = `1.0`

const login = async (login, password) => {
  await axios
    .post(`${URL_API}/${VERSION}/user/login`, {
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
    .get(`${URL_API}/${VERSION}/donation/all`, {
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

const getDonation = async (id) => {
  return await axios
    .get(`${URL_API}/${VERSION}/donation/${id}`, {
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
    .get(`${URL_API}/${VERSION}/donation/user/${id}`, {
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
    .get(`${URL_API}/${VERSION}/center/all`, {
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

const getDonationCenter = async (id) => {
  return await axios
    .get(`${URL_API}/${VERSION}/center/${id}`, {
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
    .get(`${URL_API}/${VERSION}/openingday/all`, {
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
        .get(`${URL_API}/${VERSION}/center/opening/${id}`, {
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
    .get(`${URL_API}/${VERSION}/openingday/${id}`, {
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
    .get(`${URL_API}/${VERSION}/user/all`, {
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
    .get(`${URL_API}/${VERSION}/user/${id}`, {
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
    .get(`${URL_API}/${VERSION}/locality/all`, {
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
    .delete(`${URL_API}/${VERSION}/donation/${id}`, {
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
    .delete(`${URL_API}/${VERSION}/center/${id}`, {
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
    .delete(`${URL_API}/${VERSION}/openingday/${id}`, {
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
    .delete(`${URL_API}/${VERSION}/user/${id}`, {
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
    .post(`${URL_API}/${VERSION}/user/register`,  {
      lastName: donor.lastName,
      firstName: donor.firstName,
      emailAddress: donor.emailAddress,
      birthdate: donor.birthdate,
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
        .post(`${URL_API}/${VERSION}/openingday`, openingDay, {
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
          if (openingDay.closingTime === '') {
            error.response.data = 'Please specify a closing time';
          } else if (openingDay.openingTime === '') {
            error.response.data = 'Please specify an opening time';
          } 
            throw error;
        });
};

const addDonationCenter = async (donationCenter) => {
  return await axios
    .post(`${URL_API}/${VERSION}/center`, donationCenter, {
      name: donationCenter.name,
      phoneNumber: donationCenter.phoneNumber,
      emailAddress: donationCenter.emailAddress,
      fax: donationCenter.fax,
      streetName: donationCenter.streetName,
      numberInStreet: donationCenter.numberInStreet,
      localityId: donationCenter.localityId,
      availableDonation: donationCenter.availableDonation,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (donationCenter.fax === '') {
        error.response.data = "Please enter a valid fax number";
      } 
      else if (donationCenter.numberInStreet === ''){
        error.response.data = "Please enter a valid number in street"
      }
      else if (donationCenter.localityId === 0){
        error.response.data = "Please select a locality"
      }
      else if (donationCenter.streetName === ''){
        error.response.data = "Please enter a valid street name"
      }

      throw error;
    });
};

const addDonation = async (donation) => {
  return await axios
    .post(`${URL_API}/${VERSION}/donation`, donation, {
      date: donation.date,
      hour: donation.hour,
      donationTypeId  : donation.donationTypeId,
      userId: donation.userId,
      donationCenterId: donation.donationCenterId,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (donation.hour=== ''){
        error.response.data = "Please enter a valid hour";
      } else if (donation.date === ''){
        error.response.data = "Please enter a valid date";
      } else if (isNaN(donation.donationTypeId)){
        error.response.data = "Please enter a valid donation type";
      } else if (isNaN(donation.userId)){
        error.response.data = "Please enter a valid user";
      } else if (isNaN(donation.donationCenterId)){
        error.response.data = "Please enter a valid donation center";
      }
      throw error;
    });
};

const updateOpeningDay = async (openingDay) => {
    return await axios
        .patch(`${URL_API}/${VERSION}/openingday`, openingDay, {
            headers: {"Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
            }
            })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
          if (openingDay.closingTime === '') {
            error.response.data = 'Please specify a closing time';
          } else if (openingDay.openingTime === '') {
            error.response.data = 'Please specify an opening time';
          } 
          throw error;
        });
};

const updateDonor = async (donor) => {
  const body = {
    id : donor.id,
    lastName: donor.last_name,
    firstName: donor.first_name,
    emailAddress: donor.email_address,
    birthDate: donor.birthday,
    bloodType: donor.bloodTypeId,
    login: donor.login,
  }

  if (donor.password !== null) {
    body.password = donor.password;
  }
  return await axios
    .patch(`${URL_API}/${VERSION}/user`, {
      body: body,
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

const updateDonationCenter = async (donationCenter) => {
  return await axios
    .patch(`${URL_API}/${VERSION}/center`, {
      id: donationCenter.id,
      name: donationCenter.name,
      phoneNumber: donationCenter.phoneNumber,
      emailAddress: donationCenter.emailAddress,
      fax: donationCenter.fax,
      streetName: donationCenter.streetName,
      numberInStreet: donationCenter.numberInStreet,
      localityId: donationCenter.localityId,
      // quand ce sera possible dans l'API
      // availableDonation: donationCenter.availableDonation,
    }, {
      headers: {"Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
      }
      })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (donationCenter.fax === ''){
        error.response.data = "Please enter a valid fax number"
      }
      else if (donationCenter.numberInStreet === ''){
        error.response.data = "Please enter a valid number in street"
      }
      
      throw error;
    });
};

const updateDonation = async (donation) => {  
  return await axios
    .patch(`${URL_API}/${VERSION}/donation`, {
      id: donation.id,
      hour: donation.hour,
      date: donation.date,
      donationTypeId: donation.donationTypeId,
      userId: donation.userId,
      donationCenterId: donation.donationCenterId,
    }, {
      headers: {"Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      }
      })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (donation.hour === ''){
        error.response.data = "Please enter a valid hour"
      }
      else if (donation.date === ''){
        error.response.data = "Please enter a valid date"
      }
      throw error;
    });
};



export {
  getAllDonations,
  getDonation,
  getDonationsFromDonor,
  login,
  getAllDonationCenters,
  getDonationCenter,
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
  addDonation,
  updateOpeningDay,
  updateDonor,
  updateDonationCenter,
  updateDonation,
};
