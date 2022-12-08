import axios from 'axios';

const ipAdress = "192.168.1.53";
const URL_API = `http://${ip}:3001;`;


const getWeatherById = async (id) => {
    const rep = await axios.get(URL_API, {
        params: {
            id,
            appid: KEY,
            units: 'metric',
            lang: "fr"
        }
    });
    return rep.data;
}

const getAllDonations = async () => {
    const rep = await axios.get(URL_API, {
        params: {
            id,
            appid: KEY,
            units: 'metric',
            lang: "fr"
        }
    });
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


//vous pouvez choisir cette méthode à la place de l'autre, si vous le désirez
const getWeatherByIdFetch = async (id) => {
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("appid", KEY);
    params.append("units", "metric");
    params.append("lang", "fr")
    const rep = await fetch(`${URL_API}?${params.toString()}`);
    return await rep.json();
}

export {getWeatherById, getWeatherByIdFetch};