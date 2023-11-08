import React, { useEffect, useState } from 'react'
import { HallInterface } from '../Model';
import { addHall, editHall } from '../repository';

const designationList = [
    { label: "Warden", value: "warden" },
    { label: "Care Taker", value: "careTaker" },
    { label: "Other", value: "other" },

]

// const designation=["warden","caretaker",""]
const salaryTypeList = ["Monthly", "Daily"];




function Edit(props: {
    hall:HallInterface
    onClose: () => void,
    getHallList: () => void
}) {

    const initialvalue: HallInterface = {
        name: "",
        about:"",
        care_taker:"",
        date_of_establish:"",
        date_time:"",
        established_by:"",
        warden_incharge:"",
    }
    const [hall, setHall] = useState<HallInterface>(initialvalue)

    const [otherdesignation, setOtherDesgination] = useState("")
    const handleSubmitButton = async (e: any) => {
        e.preventDefault()
      
        // const data = await editHall(hallData);
        // if (data) {
        //     props.getHallList();
        //     props.onClose()
        // }

    }


    // console.log(hall)

    useEffect(()=>{
        setHall(props.hall)
    },[])
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
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit hall</h3>
                        <form className="space-y-6" action="#">

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Name *</label>
                                <input
                                    value={hall.name}
                                    onChange={(e: any) => {
                                        setHall({ ...hall, name: e.target.value })
                                    }}
                                    type="text" name="name" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Name Surname" required />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email *</label>
                                <input
                                    value={hall.email}
                                    onChange={(e: any) => {
                                        setHall({ ...hall, email: e.target.value })
                                    }}
                                    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="example@domain.com" required />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Salary (in Rs) *</label>
                                <input
                                    value={hall.salary}
                                    onChange={(e: any) => {
                                        setHall({ ...hall, salary: e.target.value })
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
                                    value={hall.salaryType}
                                    onChange={(e) => {
                                        setHall({
                                            ...hall,
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
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Designation *</label>

                                <select
                                    name="salary_type"
                                    id="salary_type"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={hall.designation}
                                    onChange={(e) => {
                                        setHall({
                                            ...hall,
                                            designation: e.target.value,
                                        });
                                        console.log("value", e.target.value);

                                    }}
                                >
                                    <option value={""}>--select a designation --</option>
                                    {designationList.map((ele) => (
                                        <option key={ele.value} value={ele.value}>
                                            {ele.label}
                                        </option>
                                    ))}



                                </select>


                                {hall.designation == "other" ?
                                    <input
                                        value={otherdesignation}
                                        onChange={(e: any) => {
                                            setOtherDesgination(e.target.value)
                                        }}
                                        placeholder="Enter the designation"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    : ""}
                            </div>


                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Birth *</label>

                                <input
                                    type="date"
                                    className={`p-2 border rounded w-full`}
                                    value={hall.dob}
                                    onChange={(e) => { setHall({ ...hall, dob: e.target.value }) }}
                                />
                            </div>

                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Joining *</label>

                                <input
                                    type="date"
                                    className={`p-2 border rounded w-full`}
                                    value={hall.date_of_joining}
                                    onChange={(e) => { setHall({ ...hall, date_of_joining: e.target.value }) }}
                                />
                            </div>



                            <button
                                onClick={handleSubmitButton}
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit hall</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit