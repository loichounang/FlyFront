import axios from "axios";
import { BASE_URL, COURS_API, createWithImageConfig, requestsConfig } from "../ApiServices";

// @List-all Categories
export const ListAllCategories = async () => {
    
    try {
        const response = await axios.get(`${BASE_URL}/${COURS_API}/categories/list-all`, requestsConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la récupération des catégories ! Code d'erreur : ", status, error);
        throw error;
    }

}

// @List Categories By ID
export const ListCategoriesByID = async (id) => {

    try {
        const response = await axios.get(`${BASE_URL}/${COURS_API}/categories/${id}`, requestsConfig);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la récupération des informations de la catégorie ! Code d'erreur : ", status, error);
        throw error;
    }
}

// @Create Categories
export const CreateCategoriesAPI = async (categoryData) => {

    try {
        const response = await axios.post(`${BASE_URL}/${COURS_API}/categories/`, categoryData, createWithImageConfig);
        console.log('Create Categories Response:', response);
        return response.status;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la création de la catégorie ! Code d'erreur : ", status, error);
        throw error;
    }
}

// @Update Lessons
export const UpdateCategoriesAPI = async (CategoriesId, CategoriesData) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/${COURS_API}/categories/${CategoriesId}`,
            CategoriesData,
            requestsConfig
        );
        console.log('Update Categories Response:', response);
        return response.status;
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
                console.error("catégorie non trouvée:", detail || "La catégorie spécifiée n'existe pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || "Une erreur est survenue lors de la mise à jour de la catégorie.", status, error);
                break;
        }
        throw error; // Rethrow error to handle it in the calling function
    }
};

// @Delete Categories
export const DeleteCategoriesAPI = async (CategoriesId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/${COURS_API}/categories/${CategoriesId}`, requestsConfig);
        console.log('Delete Categories Response:', response);
        return response.status;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.data?.detail;
        
        // Gestion améliorée des erreurs
        switch (status) {
            case 400:
                console.error("Erreur de validation:", detail || "Erreur de validation des données.");
                break;
            case 401:
                console.error("Erreur d'authentification:", detail || "Non autorisé.");
                break;
            case 404:
                console.error("catégorie non trouvée:", detail || "La catégorie spécifiée n'existe pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || "Une erreur est survenue lors de la suppression de la catégorie.", status, error);
                break;
        }
        throw error; // Rethrow error to handle it in the calling function
    }
};
