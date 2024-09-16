import axios from "axios";
import { BASE_URL, COURS_API, createWithImageConfig, requestsConfig } from "../ApiServices";

// @List-all Lessons
export const ListAllLessons= async () => {
    
    try {
        const response = await axios.get(`${BASE_URL}/${COURS_API}/leçons`, requestsConfig);
        console.log(response.data);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la récupération des leçons ! Code d'erreur : ", status, error);
        throw error;
    }

}

// @List Categories By ID
export const ListLessonsByID = async (id) => {

    try {
        const response = await axios.get(`${BASE_URL}/${COURS_API}/leçons/${id}`, requestsConfig);
        return response.data;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la récupération des informations de la leçon ! Code d'erreur : ", status, error);
        throw error;
    }
}

// @List Lessons By Chapter ID
export const ListLessonsByChapterID = async (chapitreID) => {
    try {
        const response = await axios.get(`${BASE_URL}/${COURS_API}/chapitres/${chapitreID}/`, requestsConfig);
        return response.data.leçons || []; // Retourne les leçons, ou un tableau vide si absent
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.data?.detail; // Corrigé pour correspondre au champ attendu
        
        console.error(detail ? detail : "Une erreur est survenue lors de la récupération des leçons du chapitre ! Code d'erreur : ", status, error);
        throw error;
    }
};

// @Create Lessons
export const CreateLessonsAPI = async (lessonsData) => {

    try {
        const response = await axios.post(`${BASE_URL}/${COURS_API}/leçons/`, lessonsData, createWithImageConfig);
        console.log('Create Lessons Response:', response);
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
export const UpdateLessonsAPI = async (lessonsId, lessonsData) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/${COURS_API}/leçons/${lessonsId}`,
            lessonsData,
            createWithImageConfig
        );
        console.log('Update Lessons Response:', response);
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
                console.error("Leçon non trouvée:", detail || "La leçon spécifiée n'existe pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || "Une erreur est survenue lors de la mise à jour de la leçon.", status, error);
                break;
        }
        throw error; // Rethrow error to handle it in the calling function
    }
};

// @Delete Lessons
export const DeleteLessonsAPI = async (lessonsId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/${COURS_API}/leçons/${lessonsId}`, requestsConfig);
        console.log('Delete Lessons Response:', response);
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
                console.error("Leçon non trouvée:", detail || "La leçon spécifiée n'existe pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || "Une erreur est survenue lors de la suppression de la leçon.", status, error);
                break;
        }
        throw error; // Rethrow error to handle it in the calling function
    }
};