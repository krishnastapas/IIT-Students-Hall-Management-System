export interface AuthRolesInterface {
    admin: Number[],
    user: Number[]
}

export interface AdminInterface {
    id?: string;
    email: string;
    name: string;
    phoneNumber: string;
    password?: string;
    permissionNo: number;
    centreIdArray?:string[];
    operation?:string;

}