import {callExternalApi} from "./external-api.service";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const getPublicResource = async () => {
    const config = {
        url: `${apiServerUrl}/api/messages/public`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };

    const {data, error} = await callExternalApi({config});

    return {
        data: data || null,
        error,
    };
};

export const getProtectedResource = async () => {
    const config = {
        url: `${apiServerUrl}/api/messages/protected`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };

    const {data, error} = await callExternalApi({config});

    return {
        data: data || null,
        error,
    };
};

export const getAdminResource = async () => {
    const config = {
        url: `${apiServerUrl}/api/messages/admin`,
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };

    const {data, error} = await callExternalApi({config});

    return {
        data: data || null,
        error,
    };
};

export const getMenu = async (Authorization) => {
    const config = {
        url: `${apiServerUrl}/menu/`,
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": Authorization
        },
    };

    const {data, error} = await callExternalApi({config});

    return {
        data: data || null,
        error,
    };
};