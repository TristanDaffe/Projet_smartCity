import axios from 'axios';

const URL_API = `http://192.168.1.56:3001`;
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJhZG1pbiIsInZhbHVlIjp7ImlkIjo5LCJsb2dpbiI6ImFkbWluIn0sImlhdCI6MTY3MDY4NTMzOSwiZXhwIjoxNjcwNzcxNzM5fQ.4WZqZ7LBwQqpjpJk-1K75kD4ddzm_eIhZanxRjbD9GU";

const getAllDonations = async () => {
    const rep = await axios.post(`${URL_API}/donation/all`,
         { headers: { 'Authorization': `Bearer ${TOKEN}`}
         
    });
    console.log(rep.data);
    return rep.data;
}

const connexion = async (login, password) => {
    const rep = await axios.post(`${URL_API}/user/login`, {
        login,
        password
    });
    console.log(rep.data);
    return rep.data;
}

const getAllDonationsFetch = async () => { 
    const rep = await fetch(`${URL_API}/donation/all`, {
        method: 'POST'});
    return await rep.json();
}

const getAllUsersFetch = async () => {
    const rep = await fetch(`${URL_API}/user/1`, {
        method: 'GET'});
    return await rep.json();
}

export {getAllDonations};