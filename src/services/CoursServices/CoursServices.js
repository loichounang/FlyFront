import axios from "axios";
import { BASE_URL, COURS_API, requestsConfig } from "../ApiServices";
import { ListCategoriesByID } from "../CategoriesServices/CategoriesServices";
import { ListUsersByID } from "../UsersServices/UsersServices";

// @List-all Cours
export const ListAllCours = async () => {
    
    try {
        const response = await axios.get(`${BASE_URL}/${COURS_API}/cours`, requestsConfig);
        console.log(response.data); // Vérifie si c'est bien un tableau
        const courses = response.data;

        // Utilisation des promesses pour exécuter toutes les promesses en parallèle 
        const detailledCoursesData = await Promise.all(
            courses.map(async (course) => {
                // Récupération des détails de la catégorie et de l'utilisateur en parallèle
                const [categoriesDetails, AuthorDetails] = await Promise.all([
                    ListCategoriesByID(course.catégorie),
                    ListUsersByID(course.auteur),
                ]);

                // Formatage des données pour retourner les valeurs nécessaires
                return {
                    id: course.id,
                    titre: course.titre,
                    description: course.description,
                    auteur: AuthorDetails ? AuthorDetails.nom + " " + AuthorDetails.prénom : "Auteur inconnu",
                    durée: course.durée,
                    category: categoriesDetails ? categoriesDetails.name : " Catégorie Inconnue",
                    categorieDescription: categoriesDetails ? categoriesDetails.description : "Aucune description pour le moment",
                    image: course.cours_image,
                    // ... Ajouter d'autres éléments au besoin
                };
            })
        );

        return detailledCoursesData;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la récupération des cours ! Code d'erreur : ", status, error);
        throw error;
    }

}

// @List-by-id
export const ListCoursByID = async (id) => {

    try {
        const response = await axios.get(`${BASE_URL}/${COURS_API}/cours/${id}`, requestsConfig);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des données');
    }
}

// @Post Cours
export const CreateCours = async (values) => {

    try {
        const response = await axios.post(`${BASE_URL}/${COURS_API}/cours/`, values, requestsConfig);
        console.log('CreateCours Response:', response);
        return response.status;
    } catch (error) {
        const status = error.response?.status;
        const detail = error.response?.detail;
        
        // Maybe you can use Switch Case Statement for a better error management
        console.error(detail ? detail : "Une erreur est survenue lors de la création du nouveau cours ! Code d'erreur : ", status, error);
        throw error;
    }
}
