import axios from "axios";
import { BASE_URL, COURS_API, requestsConfig } from "../ApiServices";


export const submitRating =  async (coursId, score) => {

    try {
        const response = await axios.post(`${BASE_URL}/${COURS_API}/ratings/`, {
            cours_id: coursId, score: score
        }, requestsConfig);
        console.log("RATING DATA : ", response);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la soumission de la notation:', error);
        throw error;
    }
}