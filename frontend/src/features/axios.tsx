import axios from "axios"
import { endpoint } from "../constant";


const instsnce = axios.create({
   
    baseURL:endpoint

})

export default instsnce;
