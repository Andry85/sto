import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://carsmarketvn.herokuapp.com/api/"
})
