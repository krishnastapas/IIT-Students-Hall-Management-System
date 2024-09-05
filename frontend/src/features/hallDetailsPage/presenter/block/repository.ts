import { showMessage } from "../../../../utils/alert";
import { getJwtToken } from "../../../../utils/function";
import { responseInterface } from "../../../Model";
import axios from "../../../axios";
import { BlockInterface } from "./Model";

export const readBlockList = async (props:{hallId:string}) => {

    try {

        const path = `/block-list/${props.hallId}`;

        let accessToken = getJwtToken()

        const response = await axios.get(path, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

         // console.log(response);
         const res=response.data as responseInterface;

         if (response.data.code === 200) {
             // console.log("response", response.data.data)
             return res.data
         }
 
         showMessage({ message: response.data.message })
         return []

    } catch (error) {
        showMessage({ message: error })
        return [];

    }
}

export const addBlock = async (block: BlockInterface) => {

    let path = `/block`
    let payload =block

    // console.log(payload)
    let accessToken = getJwtToken();

    try {

        const response = await axios.post(path, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log(response)
        const res=response.data as responseInterface;
        if (response.data.code === 200) {
            showMessage({message:res.message,status:res.code});
            return true;
        }

        showMessage({ message: res.message,status:res.code })
        return false;

    } catch (error) {
        showMessage({ message: error })
        // return [];
    }

}

//update  a block
export const editBlock = async (block: BlockInterface) => {

    let path = `/block`

    let payload = block

    let accessToken = getJwtToken();

    try {

        const response = await axios.put(path, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log(response)
        const res=response.data as responseInterface
        if (response.data.code === 200) {
            showMessage({message:res.message,status:res.code});
            return true;
        }

        showMessage({ message: res.message,status:res.code })
        return false;
        // return []

    } catch (error) {
        showMessage({ message: error })
        // return [];
    }

}

//delete a block
export const deleteBlockApi = async (id:string) => {
    console.log(id)
    let path = `/block/${id}`


    let accessToken = getJwtToken()

    try {

        const response = await axios.delete(path, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        console.log(response)
        const res:responseInterface=response.data;

        if(res.code==200){
            showMessage({message:res.message,status:res.code})
            return true;
        }


        showMessage({ message: response.data.message,status:res.code })
        return false

    } catch (error) {
        showMessage({message:error})
        // return [];
    }

}