import axios from "axios";
import { BASE_URL, USERS_API, requestsConfig } from "../ApiServices";

// @List-all Users
export const ListAllUsers = async () => {
    
    try {
        const response = await axios.get(`${BASE_URL}/${USERS_API}/utilisateurs`);
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
        const response = await axios.get(`${BASE_URL}/${USERS_API}/utilisateurs/${id}`);
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

// @List Users Roles
export const ListUsersRoles = async () => {

    try {
        const response = await axios.get(`${BASE_URL}/${USERS_API}/roles/list_roles`);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.data?.detail; // Correction pour accéder au détail de l'erreur
        
        // Gestion améliorée des erreurs
        switch (status) {
            case 400:
                console.error("Erreur de validation:", detail || "Erreur de validation des données.");
                break;
            case 401:
                console.error("Erreur d'authentification:", detail || "Non autorisé.");
                break;
            case 404:
                console.error("Non trouvés:", detail || "N'existe pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || "Une erreur est survenue lors de la mise à jour des roles.", status, error);
                break;
        }
        throw error; // Rethrow error to handle it in the calling function
    }
}

// @ Create User API
export const CreateUser = async (dataToSubmit) => {
    try {
        const response = await axios.post(`${BASE_URL}/${USERS_API}/utilisateurs/`, dataToSubmit, {requestsConfig});
        return response.status;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.data?.detail;
        
        switch (status) {
            case 400:
                console.error("Erreur de validation:", detail || "Erreur de validation des données.");
                break;
            case 401:
                console.error("Erreur d'authentification:", detail || "Non autorisé.");
                break;
            case 404:
                console.error("Ressource non trouvée:", detail || "L'utilisateur ou les équipes n'existent pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || "Une erreur inattendue est survenue. Code d'erreur : ", status);
                break;
        }
        throw error;
    }
};

/* @List Users Teams
export const ListTeams = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/${EQUIPES_API}/equipes/`, requestsConfig);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.data?.detail;
        
        switch (status) {
            case 400:
                console.error("Erreur de validation:", detail || "Erreur de validation des données.");
                break;
            case 401:
                console.error("Erreur d'authentification:", detail || "Non autorisé.");
                break;
            case 404:
                console.error("Ressource non trouvée:", detail || "L'utilisateur ou les équipes n'existent pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || `Une erreur inattendue est survenue. Code d'erreur : ${status}`);
                break;
        }
        throw error;
    }
};
*/

export const UpdateUser = async (id,dataUpdate) => {
    try {
        const response = await axios.put(`${BASE_URL}/${USERS_API}/utilisateurs/${id}/`, dataUpdate, {requestsConfig});
        return response.status;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.data?.detail;
        
        switch (status) {
            case 400:
                console.error("Erreur de validation:", detail || "Erreur de validation des données.");
                break;
            case 401:
                console.error("Erreur d'authentification:", detail || "Non autorisé.");
                break;
            case 404:
                console.error("Ressource non trouvée:", detail || "L'utilisateur ou les équipes n'existent pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || `Une erreur inattendue est survenue. Code d'erreur : ${status}`);
                break;
        }
        throw error;
    }
};