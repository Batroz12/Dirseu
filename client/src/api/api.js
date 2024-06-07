
export const createUserRequest = async (data) =>
    await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const createStudentRequest = async (data) =>
    await fetch('http://localhost:4000/api/signup/student', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const createDocenteRequest = async (data) =>
    await fetch('http://localhost:4000/api/signup/docente', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const accesUserRequest = async (data) =>
    await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const refreshTokenRequest = async (refreshToken) => {
    return await fetch('http://localhost:4000/api/refresh-token', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
        },
    });
};

export const accessTokenRequest = async (accessToken) => {
    return await fetch('http://localhost:4000/api/user', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const signOutRequest = async (refreshToken) => {
    return await fetch('http://localhost:4000/api/signout', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
        },
    });
};


// API´s TO TABLES
export const getTableRequest = async (table) => {
    return await fetch('http://localhost:4000/api/table/get-table', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(table)
    });
};
