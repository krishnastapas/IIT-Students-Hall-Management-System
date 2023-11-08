import { AdminInterface } from "../context/Model";

export const getUserRole=(props:{user:any})=>{

    if(props.user.permissionNo==1000){
        return "chief-warden"
    }
    if(props.user.permissionNo==3000){
        return "admin"
    }

}