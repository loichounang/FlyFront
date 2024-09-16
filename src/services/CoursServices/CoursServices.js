import axios from "axios";
import { BASE_URL, COURS_API, createWithImageConfig, requestsConfig } from "../ApiServices";
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
                    ListCategoriesByID(course.categorie),
                    ListUsersByID(course.auteur),
                ]);

                // Formatage des données pour retourner les valeurs nécessaires
                return {
                    id: course.id,
                    titre: course.titre,
                    description: course.description,
                    auteur: AuthorDetails ? AuthorDetails.nom + " " + AuthorDetails.prénom : "Auteur inconnu",
                    durée: course.duree,
                    category: categoriesDetails ? categoriesDetails.name : " Catégorie Inconnue",
                    categorieDescription: categoriesDetails ? categoriesDetails.description : "Aucune description pour le moment",
                    image: course.image,
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
        // Récupérer les détails du cours
        const response = await axios.get(`${BASE_URL}/${COURS_API}/cours/${id}`, requestsConfig);
        const course = response.data;

        // Récupération des détails de la catégorie et de l'auteur en parallèle
        const [categoriesDetails, AuthorDetails] = await Promise.all([
            ListCategoriesByID(course.categorie),
            ListUsersByID(course.auteur),
        ]);

        // Formatage des données pour retourner les valeurs nécessaires
        return {
            id: course.id,
            titre: course.titre,
            description: course.description,
            auteur: AuthorDetails ? `${AuthorDetails.nom} ${AuthorDetails.prénom}` : "Auteur inconnu",
            durée: course.duree,
            category: categoriesDetails ? categoriesDetails.name : "Catégorie Inconnue",
            categorieDescription: categoriesDetails ? categoriesDetails.description : "Aucune description pour le moment",
            image: course.image,
            // ... Ajouter d'autres éléments au besoin
        };
    } catch (error) {
        throw new Error(error.response?.data?.detail || 'Erreur lors de la récupération des données');
    }
}

// @Post Cours
export const CreateCours = async (values) => {

    try {
        const response = await axios.post(`${BASE_URL}/${COURS_API}/cours/`, values, createWithImageConfig);
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

// @Update Cours
export const UpdateCoursAPI = async (CoursId, CoursData) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/${COURS_API}/cours/${CoursId}`,
            CoursData,
            createWithImageConfig
        );
        console.log('Update Cours Response:', response);
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
                console.error("Cours non trouvé:", detail || "Le Cours spécifié n'existe pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || "Une erreur est survenue lors de la mise à jour de la Cours.", status, error);
                break;
        }
        throw error; // Rethrow error to handle it in the calling function
    }
};

// @Delete Cours
export const DeleteCoursAPI = async (CoursId) => {
    try {
        const response = await axios.delete(
            `${BASE_URL}/${COURS_API}/cours/${CoursId}`, requestsConfig);
        console.log('Delete Cours Response:', response);
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
                console.error("cours non trouvé:", detail || "La cours spécifié n'existe pas.");
                break;
            case 500:
                console.error("Erreur serveur:", detail || "Une erreur est survenue sur le serveur.");
                break;
            default:
                console.error(detail || "Une erreur est survenue lors de la suppression du cours.", status, error);
                break;
        }
        throw error; // Rethrow error to handle it in the calling function
    }
};