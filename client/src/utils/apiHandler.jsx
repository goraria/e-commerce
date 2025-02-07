import axios from "axios";

const apiHandler = axios.create({
    baseURL: "http://localhost:5172",
    // headers: {
    //     "Content-Type": "application/json",
    // },
    timeout: 10000,
});

export default apiHandler;