import { showMessage } from "../../utils/alert";
import { responseInterface } from "../Model";
import axios from "../axios";


export const JwtRestApi = async (props: { jwtToken: string }) => {
  console.log({
    "jwtToken": props.jwtToken
  })

  let path = "/jwt-login"
  try {

    const response = await axios.get(path, {
      headers: {
        'Authorization': `Bearer ${props.jwtToken}`
      }
    });
    console.log(response)
    const res = response.data as responseInterface
    if (response.data.code == 200) {
      return res.data
    }
    // showMessage({ message: response.data.message, status: res.code });
    return null;
  } catch (error) {
    showMessage({})
    return null;
  }
}

export const logOutApi = async (props: { userId: string }) => {

  let payload = {

    "userId": props.userId,

  }
  console.log(props.userId)
  let path = '/login-destroy'
  try {

    const response = await axios.post(path, payload);
    console.log(response)

    if (response.data.code === 200) {
      return;

    }


    // showMessage({ message: response.data.message })
    return null;

  } catch (error) {
    showMessage({ status: 500 })
    return null;
  }

}