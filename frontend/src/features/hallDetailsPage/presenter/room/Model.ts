export interface RoomInterface {
    _id?: string,
    name: string,
    date_time?:string ,
    hallId: string,
    blockId: string,
    noOfBeds: number,
    isEmpty: boolean,
    studentId: string,
    status?:string ,
    floor:number
}