export interface responseInterface {
    code: number;
    message: string;
    data?: any;
    jwtToken?: string;


}

export interface navigationInterface {
    name: string;
    path: string;
    icon: any;
}