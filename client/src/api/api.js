const BASE_URL = 'http://localhost:4000/api';

export const createUserRequest = async (data) =>
    await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const createStudentRequest = async (data) =>
    await fetch(`${BASE_URL}/signup/student`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const createDocenteRequest = async (data) =>
    await fetch(`${BASE_URL}/signup/docente`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const accesUserRequest = async (data) =>
    await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const refreshTokenRequest = async (refreshToken) => {
    return await fetch(`${BASE_URL}/refresh-token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
        },
    });
};

export const accessTokenRequest = async (accessToken) => {
    return await fetch(`${BASE_URL}/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const signOutRequest = async (refreshToken) => {
    return await fetch(`${BASE_URL}/signout`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
        },
    });
};


// API's TO USERS
export const getUserInfoRequest = async (accessToken) => {
    return await fetch(`${BASE_URL}/user/info`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

// API´s TO TABLES
export const getTableRequest = async (table) => {
    return await fetch(`${BASE_URL}/table/get-table`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(table)
    });
};

export const getTableByIdRequest = async (data) => {
    return await fetch(`${BASE_URL}/table/get-module`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
};

export const getUsersInscriptionRequest = async (data) => {
    return await fetch(`${BASE_URL}/table/users-inscription`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data) // Aquí se pasa un objeto con las propiedades table e id
    });
};

export const registerInscriptionRequest = async (data) => {
    return await fetch(`${BASE_URL}/table/register-inscription`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
};



