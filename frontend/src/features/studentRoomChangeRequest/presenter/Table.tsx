import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { useUserAuth } from '../../context/UserAuthContext'
import { HiOutlinePencil, HiArchive,HiX} from "react-icons/hi";
import { confirmationMessage } from '../../../utils/alert'
import { getUserRole } from '../../auth/authRoles'
import { RoomChangeRequestInterface } from '../Model';

// import {  } from '../repository';
function Table(props: {
    roomChangeRequestList: RoomChangeRequestInterface[],
}) {
    const navigate = useNavigate();
    const { user } = useUserAuth()
    const [showFilterOption, setShowFilterOption] = useState(false);
    const [siteFilter, setSiteFilter] = useState("all")







    return (
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-10 py-3">Hall Name</th>
                            <th scope="col" className="px-2 py-3">Room No</th>
                            <th scope="col" className="px-2 py-3"> Date Of Apply</th>
                            <th scope="col" className="px-2 py-3"> Status</th>
                            {/* <th scope="col" className="px-2 py-3"> Comment</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {props.roomChangeRequestList.map((roomChangeRequest: RoomChangeRequestInterface, index: number) => {
                            return (
                                <tr className="border-b dark:border-gray-700">
                                    <td className="px-2 py-3">{roomChangeRequest.hallName}</td>
                                    <td className="px-2 py-3">{roomChangeRequest.roomName}</td>
                                    <td className="px-2 py-3">{roomChangeRequest.date_time_applied}</td>
                                    {roomChangeRequest.status == "applied" ? <td className="px-2 py-3">
                                    {roomChangeRequest.status}

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


