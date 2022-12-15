import axios from 'axios';
import {setToken, getToken} from '../../context/LoginContext';

const URL_API = `http://192.168.1.32:3001`;

const getAllDonations = async () => {
    return await axios
        .get(`${URL_API}/donation/all`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${getToken()}`
            }
        })
        .then(response => {
            // console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log(error);
      });
}

const login = async (login, password) => {
    await axios.post(`${URL_API}/user/login`, {
        login : login,
        password : password
    })
    .then(response => {
        console.log(response.data);
        if(response.data.isAdmin){
            setToken(response.data.token);
        } else {
            console.log("Vous n'êtes pas admin mais faudra faire bien");
        }
    })
    .catch(error => {
        console.log(error);
    }
    );
}

const getAllDonationCenters = async () => {
    return await axios
        .get(`${URL_API}/center/all`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${getToken()}`
            }
        })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log("pas marché");
            console.log(error);
      });
}

const getAllOpeningDays = async () => {
    return await axios
        .get(`${URL_API}/openingDay/all`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${getToken()}`
            }
        })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log("get all opening days request failed");
            console.log(error);
        });
}

const getAllUsers = async () => {
    return await axios
        .get(`${URL_API}/user/all`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${getToken()}`
            }
        })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(error => {
            console.log("get all users request failed");
            console.log(error);
        });
}


export {getAllDonations, login, getAllDonationCenters, getAllOpeningDays, getAllUsers};