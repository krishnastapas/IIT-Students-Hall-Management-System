import React, { useEffect, useState } from 'react'
import { StudentInterface } from '../Model';
import { addStudent } from '../repository';
import { designationList, salaryTypeList } from '../../../utils/constantData';


const department = ["Computer Science", "Mechanical", "Electrical", "Electronics", "Civil"]

const courseList = ["BTech", "MTech", "PHD", "MSC"]




function Add(props: {
    onClose: () => void,
    getStudentList: () => void
}) {

    const initialvalue: StudentInterface = {
        rollNumber: "",
        courseName: "",
        department: "",
        admisionDate: "",
        vallidDate: "",
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        password: "",
        dob: "",
        date_time: "",
    }
    const [student, setStudent] = useState<StudentInterface>(initialvalue)

    const [otherdesignation, setOtherDesgination] = useState("")
    const handleSubmitButton = async (e: any) => {
        e.preventDefault()

        for(let i=0;i<50;i++){
            const data = await addStudent({...student,
            name:student.name+i,
            email:student.email+i+"@gmail.com",
            rollNumber:student.rollNumber+i,
            phoneNumber:student.phoneNumber+i
        });
           
        }

    
            props.getStudentList();
            // props.onClose()
        
       

    }

    // const handleSubmitButton = async (e: any) => {
    //     e.preventDefault()

    //     const data = await addStudent(student);
    //     if (data) {
    //         props.getStudentList();
    //         props.onClose()
    //     }

    // }


    console.log(student)
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
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add student</h3>
                        <form className="space-y-6" action="#">

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Name *</label>
                                <input
                                    value={student.name}
                                    onChange={(e: any) => {
                                        setStudent({ ...student, name: e.target.value })
                                    }}
                                    type="text" name="name" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Name Surname" required />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email *</label>
                                <input
                                    value={student.email}
                                    onChange={(e: any) => {
                                        setStudent({ ...student, email: e.target.value })
                                    }}
                                    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Roll Number *</label>
                                <input
                                    value={student.rollNumber}
                                    onChange={(e: any) => {
                                        setStudent({ ...student, rollNumber: e.target.value })
                                    }}
                                    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>




                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Address*</label>
                                <input
                                    value={student.address}
                                    onChange={(e: any) => {
                                        setStudent({ ...student, address: e.target.value })
                                    }}
                                    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter phone Number *</label>
                                <input
                                    value={student.phoneNumber}
                                    onChange={(e: any) => {
                                        setStudent({ ...student, phoneNumber: e.target.value })
                                    }}
                                    type='text'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>



                            {/* <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Course*</label>
                                <input
                                    value={student.courseName}
                                    onChange={(e: any) => {
                                        setStudent({ ...student, courseName: e.target.value })
                                    }}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div> */}


                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Course *</label>

                                <select
                                    name="salary_type"
                                    id="salary_type"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={student.courseName}
                                    onChange={(e) => {
                                        setStudent({
                                            ...student,
                                            courseName: e.target.value,
                                        });
                                        console.log("value", e.target.value);

                                    }}
                                >
                                    <option value={""}>--select course --</option>
                                    {courseList.map((ele) => (
                                        <option key={ele} value={ele}>
                                            {ele}
                                        </option>
                                    ))}


                                </select>


                            </div>

                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department *</label>

                                <select
                                    name="salary_type"
                                    id="salary_type"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={student.department}
                                    onChange={(e) => {
                                        setStudent({
                                            ...student,
                                            department: e.target.value,
                                        });
                                        console.log("value", e.target.value);

                                    }}
                                >
                                    <option value={""}>--select department  --</option>
                                    {department.map((ele) => (
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
                                    value={student.dob}
                                    onChange={(e) => { setStudent({ ...student, dob: e.target.value }) }}
                                />
                            </div>

                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of admission *</label>

                                <input
                                    type="date"
                                    className={`p-2 border rounded w-full`}
                                    value={student.admisionDate}
                                    onChange={(e) => { setStudent({ ...student, admisionDate: e.target.value }) }}
                                />
                            </div>
                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valid upto *</label>

                                <input
                                    type="date"
                                    className={`p-2 border rounded w-full`}
                                    value={student.vallidDate}
                                    onChange={(e) => { setStudent({ ...student, vallidDate: e.target.value }) }}
                                />
                            </div>



                            <button
                                onClick={handleSubmitButton}
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add student</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add