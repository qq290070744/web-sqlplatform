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
export const getEnv = async (Authorization) => {
    const config = {
        url: `${apiServerUrl}/get_env/`,
        method: "GET",
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
export const pending = async (Authorization) => {
    const config = {
        url: `${apiServerUrl}/pending/?offset=0&limit=1`,
        method: "GET",
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
export const dataExportPending = async (Authorization) => {
    const config = {
        url: `${apiServerUrl}/data_export_pending/?offset=0&limit=1`,
        method: "GET",
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
export const sqlcount = async (Authorization) => {
    const config = {
        url: `${apiServerUrl}/sqlcount/`,
        method: "GET",
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
export const workorder = async (Authorization) => {
    const config = {
        url: `${apiServerUrl}/workorder/?offset=1&limit=1`,
        method: "GET",
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
export const workorderDataExport = async (Authorization) => {
    const config = {
        url: `${apiServerUrl}/workorder_data_export/?offset=1&limit=1`,
        method: "GET",
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
export const getQueryLog = async (Authorization) => {
    const config = {
        url: `${apiServerUrl}/get_query_log?offset=1&limit=1`,
        method: "GET",
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
