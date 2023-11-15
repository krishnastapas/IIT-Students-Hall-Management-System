export interface RoomInterface {
    _id?: string,
    name: string,
    date_time?:string ,
    hallId: string,
    blockId: string,
    noOfBeds: number,
    noOfStudent: boolean,
    studentId: string,
    price?:number ,
    floor:number
}