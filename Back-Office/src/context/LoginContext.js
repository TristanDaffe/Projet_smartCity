import React from "react";
import { useParams } from "react-router-dom";

function setToken (token) {
  localStorage.setItem("token", token);
}

function getToken () {
    return localStorage.getItem("token");
}

function removeToken () {
    localStorage.removeItem("token");
}

export { setToken, getToken, removeToken };

