export interface MessInterface {
    _id?:string,
    hallList: string[],
    name: string,
    managerName: string,
    perDayMeal: number,
    email: string,
    password: string,
    establishedDate: string,
    establishedBy: string,
}

export interface SelectedData {
    value: string,
    label: string
}