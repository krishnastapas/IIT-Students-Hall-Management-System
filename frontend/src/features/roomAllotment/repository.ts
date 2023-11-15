import { showMessage } from "../../utils/alert";
import { getJwtToken } from "../../utils/function";
import { responseInterface } from "../Model";
import axios from "../axios";
import { StudentInterface } from "../student/Model";

export const readEmptyRoomList = async (hallId: string) => {

    try {

        const path = "/room-empty-list/" + hallId;

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
            return res.data
        }

        showMessage({ message: response.data.message })
        return []

    } catch (error) {
        showMessage({ message: error })
        return [];

    }
}

export const readStudentList = async (hallId:string) => {
    try {

        const path = "/student-room-not-alloted/"+hallId;

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
            return res.data
        }

        showMessage({ message: response.data.message })
        return []

    } catch (error) {
        showMessage({ message: error })
        return [];

    }
}


export const allotRoomToStudent = async (studentList: StudentInterface[]) => {

    let path = `/student-room-allot`
    let payload = { "studentList": studentList }


    // console.log(payload)
    let accessToken = getJwtToken();


    try {

        const response = await axios.post(path, payload, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        console.log(response)
        const res = response.data as responseInterface;
        if (response.data.code === 200) {
            showMessage({ message: res.message, status: res.code });
            return true;
        }

        showMessage({ message: res.message, status: res.code })
        return false;

    } catch (error) {
        showMessage({ message: error })
        // return [];
    }

}