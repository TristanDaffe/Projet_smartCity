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

function getError () {
    return localStorage.getItem("error");
}

function removeError () {
    localStorage.removeItem("error");
}

function setError (error) {
    localStorage.setItem("error", error);
}

export { setToken, getToken, removeToken,
         getError, removeError, setError };

