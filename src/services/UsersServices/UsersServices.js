import axios from "axios";
import { BASE_URL, USERS_API, requestsConfig } from "../ApiServices";

// @List-all Users
export const ListAllUsers = async () => {
    
    try {
        const response = await axios.get(`${BASE_URL}/${USERS_API}/utilisateurs`, requestsConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la récupération des utilisateurs ! Code d'erreur : ", status, error);
        throw error;
    }

}

// @List Users By ID
export const ListUsersByID = async (id) => {

    try {
        const response = await axios.get(`${BASE_URL}/${USERS_API}/utilisateurs/${id}`, requestsConfig);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la récupération des informations de l'utilisateur ! Code d'erreur : ", status, error);
        throw error;
    }
}

// @List All Administrators
export const ListAllAdministrators = async (id) => {

    try {
        const response = await axios.get(`${BASE_URL}/${USERS_API}/utilisateurs/${id}/get_admins`, requestsConfig);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la récupération des informations de l'utilisateur ! Code d'erreur : ", status, error);
        throw error;
    }
}