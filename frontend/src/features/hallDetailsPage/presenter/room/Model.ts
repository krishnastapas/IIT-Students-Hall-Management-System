export interface RoomInterface {
    _id?: string,
    name: string,
    date_time?:string ,
    hallId: string,
    blockId: string,
    noOfBeds: number,
    noOfStudent: number,
    studentId: string,
    price?:number ,
    floor:number
}