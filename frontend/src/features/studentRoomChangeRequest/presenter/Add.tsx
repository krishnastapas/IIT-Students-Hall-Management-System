import React, { useEffect, useState } from 'react'
import { RoomChangeRequestInterface } from '../Model';
import { CheckRoomIsEmpty, addRoomChangeRequest } from '../repository';
import { designationList, salaryTypeList } from '../../../utils/constantData';
import { HallInterface } from '../../hall/Model';
import { useUserAuth } from '../../context/UserAuthContext';







function Add(props: {
    onClose: () => void,
    hallList: HallInterface[],
    getRoomChangeRequestList: () => void,

}) {
    const { user } = useUserAuth()

    const initialvalue: RoomChangeRequestInterface = {
        _id: "",
        comment: "",
        date_time_action: "",
        date_time_applied: "",
        hallId: "",
        hallName: "",
        isAccepted: false,
        reasonForChange: "",
        roomId: "",
        roomName: "",
        status: "",
        studentId: user._id ?? ""
    }
    const [roomChangeRquest, setRoomChangeRequest] = useState<RoomChangeRequestInterface>(initialvalue)
    const [isempty, setIsEmpty] = useState(false)

    const handleSubmitButton = async (e: any) => {
        e.preventDefault()

        const data = await addRoomChangeRequest(roomChangeRquest);
        if (data) {
            props.getRoomChangeRequestList();
            setRoomChangeRequest(initialvalue)
            // props.onClose()
        }

    }
    const handleCheckButton = async () => {
        const data = await CheckRoomIsEmpty({ hallId: roomChangeRquest.hallId, roomName: roomChangeRquest.roomName })
        if (data) {
            setRoomChangeRequest({
                ...roomChangeRquest,
                roomId: data._id,
                studentId: user._id ?? ""
            })
            setIsEmpty(true)
        } else {
            setIsEmpty(false)
        }
    }


    console.log(roomChangeRquest)
    return (

        <div className="px-6 py-6 lg:px-8">
            <form className="space-y-6" action="#">

                <div className="md:col-span-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Choose HAll *</label>

                    <select
                        name="salary_type"
                        id="salary_type"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={roomChangeRquest.hallId}
                        onChange={(e) => {
                            setRoomChangeRequest({
                                ...roomChangeRquest,
                                hallId: e.target.value,
                            });
                            console.log("value", e.target.value);

                        }}
                    >
                        <option value={""}>--select a hall --</option>
                        {props.hallList.map((ele) => (
                            <option key={ele._id} value={ele._id}>
                                {ele.name}
                            </option>
                        ))}


                    </select>


                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Room Name *</label>

                    <input
                        value={roomChangeRquest.roomName}
                        onChange={(e: any) => {
                            setRoomChangeRequest({ ...roomChangeRquest, roomName: e.target.value })
                        }}
                        type="text" name="name" id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Eg:-A-101" required />
                </div>

                <div>
                    <button type="button"
                        onClick={handleCheckButton}
                        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Check Room
                    </button>

                </div>

                {isempty && <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Why you want to change the room? *</label>

                    <textarea
                        value={roomChangeRquest.reasonForChange}
                        onChange={(e: any) => {
                            setRoomChangeRequest({ ...roomChangeRquest, reasonForChange: e.target.value })
                        }}
                        name="name" id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required />
                </div>}


                <button
                    disabled={!isempty}
                    onClick={handleSubmitButton}

                    className={isempty ? "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" : "px-8 py-3 text-white bg-blue-300 rounded focus:outline-none"}>Apply</button>

            </form>
        </div>

    )
}

export default Add