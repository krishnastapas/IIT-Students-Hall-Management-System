export interface RoomChangeRequestInterface {
    _id: string,
    hallId: string,
    studentId: string,
    roomId: string,
    roomName: string,
    hallName: string,
    reasonForChange: string,
    date_time_applied: string,
    date_time_action: string,
    status: string,
    isAccepted: boolean,
    comment: string
}