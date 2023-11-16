import { showMessage } from "../../utils/alert";
import { getJwtToken } from "../../utils/function";
import { responseInterface } from "../Model";
import axios from "../axios";
import { HallInterface } from "../hall/Model";

export const readHall = async (id:string) => {

    try {

        const path = "/hall/"+id;

        let accessToken = getJwtToken()

        const response = await axios.get(path, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // console.log(response);
        const res = response.data as responseInterface;

        if (response.data.code === 200) {
            // console.log("response", response.data.data)
            return res.data as HallInterface
        }

        showMessage({ message: response.data.message })
        return null

    } catch (error) {
        showMessage({ message: error })
        return null;

    }
}

export const passwordSetApi = async (hall: HallInterface) => {

    let path = `/hall-password-set`

    let payload = {
        _id:hall._id,
        wardenPassword:hall.wardenPassowrd
    }

    let accessToken = getJwtToken();
   
    

    try {

        const response = await axios.post(path, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,

            }
        });

        console.log(response)
        const res = response.data as responseInterface
        if (response.data.code === 200) {
            showMessage({ message: res.message, status: res.code });
            return true;
        }

        showMessage({ message: res.message, status: res.code })
        return false;
        // return []

    } catch (error) {
        showMessage({ message: error })
        // return [];
    }

}