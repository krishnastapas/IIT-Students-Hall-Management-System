import { showMessage } from "../../utils/alert";
import { getJwtToken } from "../../utils/function";
import { responseInterface } from "../Model";
import axios from "../axios";
import { MessInterface, SelectedData } from "./Model";

export const readMessList = async () => {

    try {

        const path = "/mess-list";

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

export const addMess = async (mess: MessInterface) => {

    let path = `/mess`
    let payload =mess

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

//update  a mess
export const editMess = async (mess: MessInterface) => {

    let path = `/mess`

    let payload = mess

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

//delete a mess
export const deleteMessApi = async (id:string) => {
    console.log(id)
    let path = `/mess/${id}`


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


export const readHallList = async () => {

    try {

        const path = "/hall-list";

        let accessToken = getJwtToken()
        let res: SelectedData[] = [];

        const response = await axios.get(path, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });


        response.data.data?.map((val: any) => {
            let obj: SelectedData = {
                value: val._id,
                label: val.name
            }
    
            res.push(obj);
        });
        if (response.data.code === 200) {
            // console.log("response", response.data.data)
            return res
        }

        showMessage({ message: response.data.message })
        return []

    } catch (error) {
        showMessage({ message: error })
        return [];

    }
}

export const passwordSetApi = async (mess: MessInterface) => {

    let path = `/mess-password-set`

    let payload = {
        _id:mess._id,
        password:mess.password
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