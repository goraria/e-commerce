import { useState, useEffect, use } from 'react';
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5172",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

export const useFetch = (url, method = "get", body = null, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (method === "get") {
                    response = await apiClient.get(url, options);
                } else {
                    response = await apiClient[method](url, body, options);
                }
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, method, body, options]);

    return { data, loading, error };
};


export const useFetchClient = axios.create({
    baseURL: "http://localhost:5172", // Cấu hình base URL cho toàn bộ API
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, // Thời gian timeout (ms)
});

export const useFetchCustom = () => {
    /**
     * Phương thức GET.
     * @param {string} url - Endpoint, ví dụ: '/api/user'
     * @param {object} config - Cấu hình bổ sung cho axios (tùy chọn)
     */
    const get = async (url, config = {}) => {
        try {
            const response = await axios.get(`${BASE_URL}${url}`, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Phương thức POST.
     * @param {string} url - Endpoint, ví dụ: '/api/user'
     * @param {object} data - Dữ liệu gửi đi
     * @param {object} config - Cấu hình bổ sung cho axios (tùy chọn)
     */
    const post = async (url, data, config = {}) => {
        try {
            const response = await axios.post(`${BASE_URL}${url}`, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Phương thức PUT.
     * @param {string} url - Endpoint, ví dụ: '/api/user'
     * @param {object} data - Dữ liệu gửi đi
     * @param {object} config - Cấu hình bổ sung cho axios (tùy chọn)
     */
    const put = async (url, data, config = {}) => {
        try {
            const response = await axios.put(`${BASE_URL}${url}`, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Phương thức DELETE.
     * @param {string} url - Endpoint, ví dụ: '/api/user'
     * @param {object} config - Cấu hình bổ sung cho axios (tùy chọn)
     */
    const remove = async (url, config = {}) => {
        try {
            const response = await axios.delete(`${BASE_URL}${url}`, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Phương thức HEAD.
     * @param {string} url - Endpoint, ví dụ: '/api/user'
     * @param {object} config - Cấu hình bổ sung cho axios (tùy chọn)
     */
    const head = async (url, config = {}) => {
        try {
            const response = await axios.head(`${BASE_URL}${url}`, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Phương thức PATCH.
     * @param {string} url - Endpoint, ví dụ: '/api/user'
     * @param {object} data - Dữ liệu gửi đi
     * @param {object} config - Cấu hình bổ sung cho axios (tùy chọn)
     */
    const patch = async (url, data, config = {}) => {
        try {
            const response = await axios.patch(`${BASE_URL}${url}`, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Phương thức OPTIONS.
     * @param {string} url - Endpoint, ví dụ: '/api/user'
     * @param {object} config - Cấu hình bổ sung cho axios (tùy chọn)
     */
    const options = async (url, config = {}) => {
        try {
            const response = await axios.options(`${BASE_URL}${url}`, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return { get, post, put, delete: remove, head, patch, options };
};

// const useFetch = (url) => {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await fetch(url);
//             const result = await response.json();
//             setData(result);
//             setLoading(false);
//         };
//         fetchData();
//     }, [url]);
//
//     return { data, loading };
// };
//
// export default useFetch;
