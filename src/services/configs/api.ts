import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.ninjasgroup.io',
});

api.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    // if required
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        // if (error.code === "ERR_NETWORK") {
        //     localStorage.setItem("pathname_on_error", window.location.pathname);
        //     window.location.href = "/500";
        // }
        if (error.response.status === (401 || 403)) {
            if (window.location.pathname !== "/auth") {
                localStorage.clear();
                window.location.href = "/auth";
            }
        }

        if (error.response.status === 404 && error.response.data?.message.includes("not found")) {
            localStorage.clear();
            window.location.href = "/auth";
        }

        return Promise.reject(error);
    }
);

export {api};
