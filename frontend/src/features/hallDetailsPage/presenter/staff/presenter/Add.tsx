import React, { useEffect, useState } from 'react'
import { StaffInterface } from '../Model';
import { addStaff } from '../repository';
import { designationList, salaryTypeList } from '../../../../../utils/constantData';
import { useParams } from 'react-router-dom';







function Add(props: {
    onClose: () => void,
    getStaffList: () => void
}) {

    const {id}=useParams();
    const initialvalue: StaffInterface = {
        hallId:id??"",
        name: "",
        email: "",
        salary: 0,
        salaryType: "",
        date_of_joining: "",
        dob: "",
        date_time: "",
        designation: "",

        image: "",
        password: "",
    }
    const [staff, setStaff] = useState<StaffInterface>(initialvalue)

    const [otherdesignation, setOtherDesgination] = useState("")
    const handleSubmitButton = async (e: any) => {
        e.preventDefault()
        let staffData: StaffInterface = {
            ...staff,
            password: staff.dob,

        }
        if (staff.designation == "other") {
            staffData = {
                ...staff,
                designation: otherdesignation,
                password: staff.dob,

            }
        }
        const data = await addStaff(staffData);
        if (data) {
            props.getStaffList();
            props.onClose()
        }

    }


    console.log(staff)
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
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add staff</h3>
                        <form className="space-y-6" action="#">

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Name *</label>
                                <input
                                    value={staff.name}
                                    onChange={(e: any) => {
                                        setStaff({ ...staff, name: e.target.value })
                                    }}
                                    type="text" name="name" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Name Surname" required />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email *</label>
                                <input
                                    value={staff.email}
                                    onChange={(e: any) => {
                                        setStaff({ ...staff, email: e.target.value })
                                    }}
                                    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="example@domain.com" required />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Designation *</label>
                                <input
                                    value={staff.designation}
                                    onChange={(e: any) => {
                                        setStaff({ ...staff, designation: e.target.value })
                                    }}
                                    id="email" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>

                            


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Salary (in Rs) *</label>
                                <input
                                    value={staff.salary}
                                    onChange={(e: any) => {
                                        setStaff({ ...staff, salary: e.target.value })
                                    }}
                                    type="number" placeholder="180"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>



                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salary Type *</label>

                                <select
                                    name="salary_type"
                                    id="salary_type"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={staff.salaryType}
                                    onChange={(e) => {
                                        setStaff({
                                            ...staff,
                                            salaryType: e.target.value,
                                        });
                                        console.log("value", e.target.value);

                                    }}
                                >
                                    <option value={""}>--select a Salary type --</option>
                                    {salaryTypeList.map((ele) => (
                                        <option key={ele} value={ele}>
                                            {ele}
                                        </option>
                                    ))}


                                </select>


                            </div>






                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Birth *</label>

                                <input
                                    type="date"
                                    className={`p-2 border rounded w-full`}
                                    value={staff.dob}
                                    onChange={(e) => { setStaff({ ...staff, dob: e.target.value }) }}
                                />
                            </div>

                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Joining *</label>

                                <input
                                    type="date"
                                    className={`p-2 border rounded w-full`}
                                    value={staff.date_of_joining}
                                    onChange={(e) => { setStaff({ ...staff, date_of_joining: e.target.value }) }}
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