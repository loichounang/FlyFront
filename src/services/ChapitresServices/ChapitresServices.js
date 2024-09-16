import axios from "axios";
import { BASE_URL, COURS_API, requestsConfig } from "../ApiServices";

// @List-all Chapters
export const ListAllChapters = async () => {
    
    try {
        const response = await axios.get(`${BASE_URL}/${COURS_API}/chapitres`, requestsConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la récupération des chapitres ! Code d'erreur : ", status, error);
        throw error;
    }

}

// @List Chapters By ID
export const ListChaptersByID = async (id) => {

    try {
        const response = await axios.get(`${BASE_URL}/${COURS_API}/chapitres/${id}`, requestsConfig);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la récupération des informations du chapitre ! Code d'erreur : ", status, error);
        throw error;
    }
}

// @List Chapters By Course ID
export const ListChaptersByCourseID = async (coursId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${COURS_API}/chapitre/?coursId=${coursId}`, requestsConfig);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des chapitres:", error);
        throw error;
    }
}

// @Create Chapters
export const CreateChapterAPI = async (chapterData) => {

    try {
        const response = await axios.post(`${BASE_URL}/${COURS_API}/chapitres/`, chapterData, requestsConfig);
        console.log('Create Chapter Response:', response);
        return response.status;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la création du chapitre ! Code d'erreur : ", status, error);
        throw error;
    }
}

// @Update Lessons
export const UpdateChapitresAPI = async (ChapitresId, ChapitresData) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/${COURS_API}/chapitres/${ChapitresId}`,
            ChapitresData,
            requestsConfig
        );
        console.log('Update Chapitres Response:', response);
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
                console.error("Chapitre non trouvé:", detail || "Le chapitre spécifié n'existe pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || "Une erreur est survenue lors de la mise à jour de Le chapitre.", status, error);
                break;
        }
        throw error; // Rethrow error to handle it in the calling function
    }
};

// @Delete Chapitres
export const DeleteChapitresAPI = async (ChapitresId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/${COURS_API}/chapitres/${ChapitresId}`, requestsConfig);
        console.log('Delete Chapitres Response:', response);
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
                console.error("Chapitre non trouvé:", detail || "Le Chapitre spécifié n'existe pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || "Une erreur est survenue lors de la suppression du chapitre.", status, error);
                break;
        }
        throw error; // Rethrow error to handle it in the calling function
    }
};
