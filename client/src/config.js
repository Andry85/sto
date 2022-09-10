import axios from "axios";
import {REACT_APP_DOMAIN_VAR} from './host';



export const axiosInstance = axios.create({
    baseURL: `${REACT_APP_DOMAIN_VAR}/api/`
    
})
