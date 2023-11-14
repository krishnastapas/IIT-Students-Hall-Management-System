import { showMessage } from "../../utils/alert";
import { getJwtToken } from "../../utils/function";
import { responseInterface } from "../Model";
import axios from "../axios";
import { StudentInterface } from "./Model";

export const readStudentList = async () => {

    try {

        const path = "/student-list";

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

export const addStudent = async (student: StudentInterface) => {

    let path = `/student`
    let payload =student

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

//update  a student
export const editStudent = async (student: StudentInterface) => {

    let path = `/student`

    let payload = student

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

//delete a student
export const deleteStudentApi = async (id:string) => {
    console.log(id)
    let path = `/student/${id}`


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