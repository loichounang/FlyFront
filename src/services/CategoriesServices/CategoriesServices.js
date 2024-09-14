import axios from "axios";
import { BASE_URL, COURS_API, requestsConfig } from "../ApiServices";

// @List-all Categories
export const ListAllCategories = async () => {
    
    try {
        const response = await axios.get(`${BASE_URL}/${COURS_API}/catégories/list-all`, requestsConfig);
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
        const response = await axios.post(`${BASE_URL}/${COURS_API}/categories/`, categoryData, requestsConfig);
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
