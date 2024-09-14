import axios from "axios";
import { BASE_URL, COURS_API, requestsConfig } from "../ApiServices";

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
        return response.data;
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
        const response = await axios.post(`${BASE_URL}/${COURS_API}/leçons/`, lessonsData, requestsConfig);
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
