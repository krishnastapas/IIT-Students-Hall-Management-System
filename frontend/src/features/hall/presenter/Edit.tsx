import React, { useEffect, useState } from 'react'
import { HallInterface } from '../Model';
import { addHall, editHall } from '../repository';
import { designationList } from '../../../utils/constantData';
import { useFetcher } from 'react-router-dom';






function Edit(props: {
    onClose: () => void,
    hallData:HallInterface,
    getHallList: () => void
}) {

    const initialvalue: HallInterface = {
        name: "",
        about: "",
        care_taker: "",
        date_of_establish: "",
        date_time: "",
        established_by: "",
        warden_incharge: "",


    }
    const [hall, setHall] = useState<HallInterface>(initialvalue)

    const [otherdesignation, setOtherDesgination] = useState("")
    const handleSubmitButton = async (e: any) => {
        e.preventDefault()
        const data = await editHall(hall);
        if (data) {
            props.getHallList();
            props.onClose()
        }

    }


    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0]

        setHall({...hall,imagefile:event.target.files![0]})


        // if (file) {
        //     const reader = new FileReader();
        //     reader.onload = (e) => {
        //         const img = new Image();
        //         img.src = e.target?.result as string;
        //         img.onload = () => {
        //             const canvas = document.createElement('canvas');
        //             canvas.width = img.width;
        //             canvas.height = img.height;
        //             const context = canvas.getContext('2d');
        //             context?.drawImage(img, 0, 0);

        //             const imageData = context?.getImageData(0, 0, img.width, img.height);
        //             const code = jsQR(imageData!.data, imageData!.width, imageData!.height);

        //             if (code) {
        //                 setQRCode(code.data);
        //             } else {
        //                 setQRCode('No QR Code found.');
        //             }
        //         };
        //     };

        //     reader.readAsDataURL(file);
        // }
    }


    useEffect(()=>{
        setHall(props.hallData)
    },[])
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
                                    placeholder="hall name" required />
                            </div>


                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    About *
                                </label>
                                <textarea
                                    value={hall.about}
                                    onChange={(e: any) => {
                                        setHall({ ...hall, about: e.target.value })
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    required />
                            </div>

                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Date Of Establishment *</label>

                                <input
                                    type="date"
                                    className={`p-2 border rounded w-full`}
                                    value={hall.date_of_establish}
                                    onChange={(e) => { setHall({ ...hall, date_of_establish: e.target.value }) }}
                                />
                            </div>

                
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Established by *</label>
                                <input
                                    value={hall.established_by}
                                    onChange={(e: any) => {
                                        setHall({ ...hall, established_by: e.target.value })
                                    }}
                                    type="text" name="name" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="hall name" required />
                            </div>

                            <div id="image-preview" className="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer">
                                <input id="upload" type="file"
                                    onChange={handleOnChange}
                                    className="hidden" accept="image/*" />

                                {hall.imagefile ? <>
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                        <button
                                            onClick={() => { 
                                                setHall({...hall,imagefile:""})
                                             }}
                                            type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only" >Close modal</span>
                                        </button>
                                    </div>
                                    <img style={{ maxHeight: "500px", maxWidth: "100%" }} src={hall.imagefile ? URL.createObjectURL(hall.imagefile) : ""} />


                                </> : <>
                                    <label htmlFor="upload" className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-8 h-8 text-gray-700 mx-auto mb-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                        </svg>
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">Upload picture</h5>
                                        <p className="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b className="text-gray-600">2mb</b></p>
                                        <p className="font-normal text-sm text-gray-400 md:px-6">and should be in <b className="text-gray-600">JPG, PNG, or GIF</b> format.</p>
                                        <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
                                    </label>
                                </>}


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