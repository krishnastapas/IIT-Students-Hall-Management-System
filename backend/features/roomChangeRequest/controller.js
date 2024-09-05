const { getCurrentDateTime } = require("../../helpers/utils");
const { find_hall } = require("../hall/database/query");
const { find_room, update_room } = require("../room/database/query");
const { update_student, find_student } = require("../student/database/query");
const { create_request_room_change, update_request_room_change, find_all_request_room_change, delete_request_room_change } = require("./database/query")
const bcrypt = require("bcrypt");

// get all section of student
exports.getAllRequestRoomChangeHall = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await find_all_request_room_change({ hallId: id })
        console.log(data)
        const requestList = []
        for (let i = 0; i < data.length; i++) {
            const room = await find_room({ _id: data[i].roomId });
            const hall = await find_hall({ _id: data[i].hallId });
            const student = await find_student({ _id: data[i].studentId })

            requestList.push({
                ...data[i],
                roomName: room ? room.name : "",
                hallName: hall ? hall.name : "",
                studentName: student ? student.name : "",
                rollNumber: student ? student.rollNumber : ""
            })
        }
        return res.send({ code: 200, data: requestList.reverse(), message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.getAllRequestRoomChangeStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await find_all_request_room_change({ studentId: id })

        console.log(data)
        const requestList = []
        for (let i = 0; i < data.length; i++) {
            const room = await find_room({ _id: data[i].roomId });
            const hall = await find_hall({ _id: data[i].hallId })

            requestList.push({
                ...data[i],
                roomName: room ? room.name : "",
                hallName: hall ? hall.name : ""
            })
        }

        return res.send({ code: 200, data: requestList.reverse(), message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}


exports.postRequestRoomChange = async (req, res) => {
    try {

        // console.log("Inside Post RequestRoomChange Api.....")
        const {
            _id,
            hallId,
            studentId,
            roomId,
            reasonForChange,
            date_time_applied,
            date_time_action,
            status,
            isAccepted,
            comment
        } = req.body

        // console.log({
        //     image,
        //     name,
        //     email,
        //     password,
        //     dob,
        //     salary,
        //     salaryType,
        //     designation,
        //     date_of_joining,
        //     date_time,
        // })

        const data = await create_request_room_change({
            hallId: hallId,
            studentId: studentId,
            roomId: roomId,
            reasonForChange: reasonForChange,
            date_time_applied: getCurrentDateTime(),
            date_time_action: date_time_action,
            status: "applied",
            isAccepted: isAccepted,
            comment: comment
        });

        if (!data) {
            return res.send({ code: 400, message: "Cannot create the RequestRoomChange" })
        }
        return res.send({ code: 200, message: "SuccessFully Created." })

    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }

}


exports.putRequestRoomChange = async (req, res) => {
    try {
        // console.log("Inside update Api.....")
        const {
            _id,
            hallId,
            studentId,
            roomId,
            reasonForChange,
            date_time_applied,
            date_time_action,
            status,
            isAccepted,
            comment

        } = req.body


        console.log({
            _id,
            hallId,
            studentId,
            roomId,
            reasonForChange,
            date_time_applied,
            date_time_action,
            status,
            isAccepted,
            comment

        })
        const data = await update_request_room_change({
            _id: _id,
            hallId: hallId,
            studentId: studentId,
            roomId: roomId,
            reasonForChange: reasonForChange,
            date_time_applied: date_time_applied,
            date_time_action: date_time_action,
            status: "action taken",
            isAccepted: isAccepted,
            comment: comment
        })


        if (isAccepted) {
            const student=await find_student({_id:studentId});
            const oldRoom = await find_room({ _id: student.roomId })
            const oldroomUpdated = await update_room({ _id: student.roomId, noOfStudent: oldRoom.noOfStudent -1 });
            const room = await find_room({ _id: roomId })
            const stud = await update_student({ _id: studentId, roomId: roomId, hallId: hallId, blockId: room.blockId });
            const roomUpdated = await update_room({ _id: room._id, noOfStudent: room.noOfStudent + 1 });
        }

        if (!data) {
            return res.send({ code: 400, message: "Cannot update the RequestRoomChange" })
        }
        return res.send({ code: 200, message: "Sucessfully Updated!" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.deleteRequestRoomChange = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await delete_request_room_change({ _id: id })

        if (!data) {
            return res.send({ code: 400, message: "Cannot delete the." })
        }

        return res.send({ code: 200, message: "RequestRoomChange deleted Successfully." })
    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}