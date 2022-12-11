import axios from 'axios';

const URL_API = `http://192.168.1.56:3001`;
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJhZG1pbiIsInZhbHVlIjp7ImlkIjo5LCJsb2dpbiI6ImFkbWluIn0sImlhdCI6MTY3MDY5MDA4NiwiZXhwIjoxNjcwNzc2NDg2fQ.EVUvocXrTtj4aQiWX5DpwQuFki0bV_cEVst5XmLehuI";

const getAllDonations = async () => {
    const rep = await axios.post(`${URL_API}/donation/all`,{
        headers: {
            Authorization: `Bearer ${TOKEN}`
        }
        })
        .then(response => {
            return response.data;
            // do something with the response
        })
        .catch(error => {
            console.log(error);
            // handle error
      });
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