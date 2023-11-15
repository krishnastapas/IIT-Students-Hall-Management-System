import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { useUserAuth } from '../../context/UserAuthContext'
import { HiOutlinePencil, HiArchive } from "react-icons/hi";
import { confirmationMessage } from '../../../utils/alert'
import { getUserRole } from '../../auth/authRoles'
import { StudentInterface } from '../../student/Model';
// import { StudentInterface } from '../Model';
// import { deleteStudentApi } from '../repository';
function Table(props: {


    // fetchStudentList: () => void
    studentList: StudentInterface[],
    // handleEditButton: (student: StudentInterface) => void
}) {
    const navigate = useNavigate();
    const { user } = useUserAuth()
    const [showFilterOption, setShowFilterOption] = useState(false);
    const [siteFilter, setSiteFilter] = useState("all")



    // let count = props.totalNoOfstudent / props.limit;
    // const arrayNos = []
    // for (let i = 0; i < count; i++) {
    //     arrayNos.push(i + 1)
    // }
    // const onClickDelete = async (student: StudentInterface) => {
    //     const flag = await confirmationMessage("Do you really want to delete the student details ?");
    //     if (flag) {

    //         const data = await deleteStudentApi(student._id ?? "");
    //         if (data) {
    //             props.fetchStudentList()
    //         }
    //     }
    // }


    return (
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-10 py-3">S/No</th>
                            <th scope="col" className="px-10 py-3">Name</th>
                            <th scope="col" className="px-2 py-3"> Roll Number</th>
                            <th scope="col" className="px-2 py-3">Course</th>
                            <th scope="col" className="px-2 py-3">Department</th>
                            <th scope="col" className="px-2 py-3">Room Name</th>

                        </tr>
                    </thead>
                    <tbody>
                        {props.studentList.map((student: StudentInterface, index: number) => {
                            return (
                                <tr className="border-b dark:border-gray-700">
                                    <td className="px-10 py-3">{index + 1}</td>

                                    <th scope="row" className="px-10 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{student.name}</th>
                                    <td className="px-2 py-3">{student.rollNumber}</td>
                                    <td className="px-2 py-3">{student.courseName}</td>
                                    <td className="px-2 py-3">{student.department}</td>
                                    <td className="px-2 py-3">{student.roomName}</td>




                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            </div>
            {/* <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">{props.totalNoOfstudent ? props.limit * (props.pageNo - 1) + 1 : 0}-{(props.limit * (props.pageNo)) > props.totalNoOfstudent ? props.totalNoOfstudent : (props.limit * (props.pageNo))}</span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-white">{props.totalNoOfstudent}</span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                    {/* privious */}
            {/* <li>
                        <a href="#"
                            onClick={() => {
                                if (props.pageNo != 1)
                                    props.changePage(props.pageNo - 1)
                            }}
                            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li> */}
            {/* numbers */}
            {/* {arrayNos.map((ele) => (

                        <li>
                            <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{ele}</a>
                        </li>
                    ))} */}

            {/* <div className="md:col-span-5">
                        <select
                            name="pathfinder_center"
                            id="pathfinder_center"
                            className="h-10 border  rounded px-4 w-full bg-gray-50"
                            value={props.pageNo}
                            onChange={(e) => {
                                props.changePage(parseInt(e.target.value))
                                console.log("value", e.target.value)
                            }}
                        >

                            {arrayNos.length ? arrayNos.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            )) :
                                <option >
                                    0
                                </option>}
                        </select>
                    </div> */}

            {/* next */}
            {/* <li>
                        <a href="#"
                            onClick={() => {
                                if (props.pageNo != Math.ceil(props.totalNoOfstudent / props.limit))
                                    props.changePage(props.pageNo + 1)
                            }}
                            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>  */}
        </div>

    )
}

export default Table


