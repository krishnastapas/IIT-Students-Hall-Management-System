import { showMessage } from "../../utils/alert"
import axios from "../axios"
import { responseInterface } from "../Model"

export const userLogin = async (props: { email: string, password: string }) => {
    console.log({
        "Email": props.email,
        "password": props.password,
    })

    let path = "/chief-warden/login"
    let payload = {

        "email": props.email,
        "password": props.password,

    }
    try {

        const response = await axios.post(path, payload);
        console.log(response)
        const res = response.data as responseInterface;
        if (res.code != 200) {
            showMessage({ message: res.message, status: res.code })
        }
        return res;


    } catch (error) {
        showMessage({ message: error, status: 500 })
        return null;
    }

}