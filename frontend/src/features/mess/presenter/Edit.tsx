import React, { useEffect, useState } from 'react'
import { MessInterface, SelectedData } from '../Model';
import { addMess, editMess } from '../repository';
import { designationList, salaryTypeList } from '../../../utils/constantData';
import { HallInterface } from '../../hall/Model';
import Select from 'react-select';



const department = ["Computer Science", "Mechanical", "Electrical", "Electronics", "Civil"]
const courseList = ["BTech", "MTech", "PHD", "MSC"]




function Edit(props: {
    onClose: () => void,
    getMessList: () => void,
    hallList: SelectedData[]
    mess: MessInterface
}) {

    const initialvalue: MessInterface = {
        hallList: [],
        name: " ",
        managerName: " ",
        perDayMeal: 0,
        email: " ",
        password: " ",
        establishedDate: " ",
        establishedBy: " ",
    }
    const [mess, setMess] = useState<MessInterface>(initialvalue)
    const [selectedHall, setSelectedHall] = useState<SelectedData[]>([])
    const [otherdesignation, setOtherDesgination] = useState("")
    const handleSubmitButton = async (e: any) => {
        e.preventDefault()

        const data = await editMess(mess);
        if (data) {
            props.getMessList();
            props.onClose()
        }

    }

    const handleHallhange = (studyOption: any, ActionMeta: any) => {
        const selectedValues = (studyOption || null)?.map(
            (option: any) => option.value
        ); console.log('Selected values:', selectedValues);
        setMess({ ...mess, hallList: selectedValues ?? [] });
        const arr = findHallIdAndsetArray(selectedValues)
        setSelectedHall(arr);
    };

    const findHallIdAndsetArray = (arr: string[]) => {
        const ans: SelectedData[] = [];
        props.hallList.map((ele) => {
            if (arr.includes(ele.value)) {
                ans.push(ele);
            }
        })

        return ans;
    }
    // console.log(mess)
    useEffect(() => {
        setMess(props.mess)
        const arr = findHallIdAndsetArray(props.mess.hallList)
        setSelectedHall(arr);
    }, [])
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
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add mess</h3>
                        <form className="space-y-6" action="#">

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Name *</label>
                                <input
                                    value={mess.name}
                                    onChange={(e: any) => {
                                        setMess({ ...mess, name: e.target.value })
                                    }}
                                    type="text" name="name" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Name Surname" required />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Manager Name *</label>
                                <input
                                    value={mess.managerName}
                                    onChange={(e: any) => {
                                        setMess({ ...mess, managerName: e.target.value })
                                    }}
                                    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Email *</label>
                                <input
                                    value={mess.email}
                                    onChange={(e: any) => {
                                        setMess({ ...mess, email: e.target.value })
                                    }}
                                    id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>


                        

                            <div className="md:col-span-5">
                                <label htmlFor="target_exam"> Select Hall </label>

                                <Select
                                    options={props.hallList}
                                    isMulti
                                    value={selectedHall}
                                    onChange={handleHallhange}
                                    placeholder="Select  Hall"
                                />

                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Address*</label>
                                <input
                                    value={mess.perDayMeal}
                                    onChange={(e: any) => {
                                        setMess({ ...mess, perDayMeal: e.target.value })
                                    }}
                                    type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter phone Number *</label>
                                <input
                                    value={mess.establishedBy}
                                    onChange={(e: any) => {
                                        setMess({ ...mess, establishedBy: e.target.value })
                                    }}
                                    type='text'
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>












                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Of Birth *</label>

                                <input
                                    type="date"
                                    className={`p-2 border rounded w-full`}
                                    value={mess.establishedDate}
                                    onChange={(e) => { setMess({ ...mess, establishedDate: e.target.value }) }}
                                />
                            </div>




                            <button
                                onClick={handleSubmitButton}
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add mess</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit