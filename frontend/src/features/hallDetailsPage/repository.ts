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
