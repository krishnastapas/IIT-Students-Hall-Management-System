import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { useUserAuth } from '../../context/UserAuthContext'
import { HiOutlinePencil, HiArchive, HiX } from "react-icons/hi";
import { confirmationMessage } from '../../../utils/alert'
import { getUserRole } from '../../auth/authRoles'
import { RoomChangeRequestInterface } from '../Model';
import { editRoomChangeRequest } from '../repository';
// import {  } from '../repository';
function Table(props: {
    roomChangeRequestList: RoomChangeRequestInterface[],
    fetchRoomChangeRequestList: () => void
}) {
    const navigate = useNavigate();
    const { user } = useUserAuth()
    const [showFilterOption, setShowFilterOption] = useState(false);
    const [siteFilter, setSiteFilter] = useState("all")
    const [showModal, setShowModal] = useState("")


    const handleAssignButton = async (req: RoomChangeRequestInterface, action: boolean) => {
        const flag = await confirmationMessage("Do you really want to assign " + req.studentName + " to " + req.roomName + "?")
        if (flag) {
            const data = await editRoomChangeRequest({ ...req, isAccepted: action });
            if (data) {
                props.fetchRoomChangeRequestList()
            }
        }

    }




    return (
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-10 py-3">Student Name</th>
                            <th scope="col" className="px-10 py-3">Roll Number</th>
                            <th scope="col" className="px-10 py-3">Hall Name</th>
                            <th scope="col" className="px-10 py-3">Room No</th>
                            <th scope="col" className="px-10 py-3"> Date Of Apply</th>
                            <th scope="col" className="px-2 py-3"> Status</th>
                            {/* <th scope="col" className="px-2 py-3"> Comment</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {props.roomChangeRequestList.map((roomChangeRequest: RoomChangeRequestInterface, index: number) => {
                            return (
                                <tr className="border-b dark:border-gray-700">
                                    <td className="px-10 py-3">{roomChangeRequest.studentName}</td>
                                    <td className="px-10 py-3">{roomChangeRequest.rollNumber}</td>
                                    <td className="px-10 py-3">{roomChangeRequest.hallName}</td>
                                    <td className="px-10 py-3">{roomChangeRequest.roomName}</td>
                                    <td className="px-10 py-3">{roomChangeRequest.date_time_applied}</td>
                                    {roomChangeRequest.status == "applied" ? <td className="px-2 py-3">
                                        <button type="button"
                                            onClick={() => {
                                                handleAssignButton(roomChangeRequest, true)
                                            }}
                                            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                            Assign
                                        </button>

                                        <button type="button"
                                            onClick={() => {
                                                handleAssignButton(roomChangeRequest, false)
                                            }}
                                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                            Reject</button>

                                    </td> :
                                        <td className="px-2 py-3">{roomChangeRequest.isAccepted ?
                                            <>
                                                <input checked id="green-checkbox" type="checkbox" value={roomChangeRequest.isAccepted ? 1 : 0} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Accpeted</label>:
                                            </>
                                            : <div className='flex'> <HiX /> 
                                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rejected</label></div>}</td>}
                                    {/* <td className="px-2 py-3">{roomChangeRequest.comment}</td> */}


                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default Table


