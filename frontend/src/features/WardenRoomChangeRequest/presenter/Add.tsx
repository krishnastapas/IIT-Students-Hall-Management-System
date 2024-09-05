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

        <div className="fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full w-full justify-center items-center flex bg-[#00000096]">
            <div className="relative w-full max-w-md max-h-full mx-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        onClick={() => { props.onClose() }}
                        type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only" >Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Why Rejecting?</h3>
                        <form className="space-y-6" action="#">


                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remarks *</label>

                                <textarea
                                    className={`p-2 border rounded w-full`}
                                    value={roomChangeRquest.comment}
                                    onChange={(e) => { setRoomChangeRequest({ ...roomChangeRquest, comment: e.target.value }) }}
                                />
                            </div>



                            <button
                                onClick={handleSubmitButton}
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add staff</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Add