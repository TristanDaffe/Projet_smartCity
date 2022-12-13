import axios from 'axios';

const URL_API = `http://10.101.10.10:3001`;
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJhZG1pbiIsInZhbHVlIjp7ImlkIjo5LCJsb2dpbiI6ImFkbWluIn0sImlhdCI6MTY3MDkzNzk3NSwiZXhwIjoxNjcxMDI0Mzc1fQ.jFiLXocaHHm6C6X6HpEq9GxvqTRZYNhO6kEL6ymRm0c";

const getAllDonations = async () => {
    return await axios
        .get(`${URL_API}/donation/all`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${TOKEN}`
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

// const connexion = async (login, password) => {
//     const rep = await axios.post(`${URL_API}/user/login`, {
//         login,
//         password
//     });
//     console.log(rep.data);
//     return rep.data;
// }

// const getAllDonationsFetch = async () => { 
//     const rep = await fetch(`${URL_API}/donation/all`, {
//         method: 'POST'});
//     return await rep.json();
// }

// const getAllUsersFetch = async () => {
//     const rep = await fetch(`${URL_API}/user/1`, {
//         method: 'GET'});
//     return await rep.json();
// }


//vous pouvez choisir cette méthode à la place de l'autre, si vous le désirez
// const getWeatherByIdFetch = async (id) => {
//     const params = new URLSearchParams();
//     params.append("id", id);
//     params.append("appid", KEY);
//     params.append("units", "metric");
//     params.append("lang", "fr")
//     const rep = await fetch(`${URL_API}?${params.toString()}`);
//     return await rep.json();
// }

export {getAllDonations};