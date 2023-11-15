import React, { useEffect, useState } from 'react'
import { designationList } from '../../../utils/constantData';
import { HallInterface } from '../../hall/Model';
import { passwordSetApi } from '../repository';






function PasswordSet(props: {
    onClose: () => void,
    hall: HallInterface
}) {

    const initialvalue: HallInterface = {
        name: "",
        about: "",
        care_taker: "",
        date_of_establish: "",
        date_time: "",
        established_by: "",
        warden_incharge: "",
        culuralSecretary: "",
        environmentalSecretory: "",
        generalSecretory: "",
        maintainanceSecretory: "",
        sportSecretary: "",
        wardenEmail: "",
        wardenPassowrd: "",


    }
    const [hall, setHall] = useState<HallInterface>(initialvalue)

    const handleSubmitButton = async (e: any) => {
        e.preventDefault()
        console.log(hall)
        const data = await passwordSetApi(hall);
        if (data) {
            props.onClose()
        }

    }


    useEffect(() => {
        setHall(props.hall)
    }, [])


    console.log(hall)
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
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Password Set</h3>
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">{hall.name}:{hall.wardenEmail}</h3>
                        <form className="space-y-6" action="#">

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Password *</label>
                                <input
                                    value={hall.wardenPassowrd}
                                    onChange={(e: any) => {
                                        setHall({ ...hall, wardenPassowrd: e.target.value })
                                    }}
                                    type="text" name="name" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="hall name" required />
                            </div>




                            <button
                                onClick={handleSubmitButton}
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">set Password</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordSet