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
    centreIdArray?: string[];
    operation?: string;
    _id?: string,
    rollNumber: string,
    courseName: string,
    department: string,
    admisionDate: string,
    vallidDate: string,
    address: string,
    dob: string,
    image?: string,
    warden_incharge: string,
    date_of_establish: string,
    care_taker: string,
    established_by: string,
    about: string,
    gallery?: string[],
    date_time: string,
    imagefile?: any,
    wardenEmail: string,
    wardenPassowrd: string,
    generalSecretory: string,
    sportSecretary: string,
    culuralSecretary: string,
    environmentalSecretory: string,
    maintainanceSecretory: string,
    messId: string,
    hallId: string,

}