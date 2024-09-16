// Server BASE URL
export const BASE_URL = 'http://127.0.0.1:8000';

// APIs BASES URLS
export const COURS_API = "api/cours";
export const USERS_API = "api/utilisateurs";

// For Authenticated All users requests
export const USER_TOKEN = localStorage.getItem("token");

export const createWithImageConfig = {
    headers: {
        Authorization: `Bearer ${USER_TOKEN}`,
        'Content-Type': 'multipart/form-data',
    },
}

export const requestsConfig = {
    headers: {
        Authorization: `Bearer ${USER_TOKEN}`,
        'Content-Type': 'application/json'
    }
}


// Others API CALLS