import { AdminInterface } from "../context/Model";

export const getUserRole=(props:{user:any})=>{

    if(props.user.permissionNo==4000){
        return "super-admin"
    }
    if(props.user.permissionNo==3000){
        return "admin"
    }

}