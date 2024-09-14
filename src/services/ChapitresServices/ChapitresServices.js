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

