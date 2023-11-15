import React, { useEffect, useState } from 'react'
import { RoomInterface } from '../Model';
import { addRoom } from '../repository';
import { useParams } from 'react-router-dom';
import { BlockInterface } from '../../block/Model';


function Add(props: {
    block: BlockInterface
    onClose: () => void,
    getRoomList: () => void
}) {
    const NoOfFloorArray = new Array(props.block.noOfFloors).fill(0);

    const { id } = useParams();
    const initialvalue: RoomInterface = {
        hallId: id ?? "",
        name: "",
        date_time: "",
        blockId: props.block._id ?? "",
        noOfStudent: 0,
        noOfBeds: 0,
        studentId: "",
        floor: 0
    }
    const [room, setRoom] = useState<RoomInterface>(initialvalue)

    const [from, setfrom] = useState(0)
    const [to, setto] = useState(0)

    const [otherdesignation, setOtherDesgination] = useState("")
    const handleSubmitButton = async (e: any) => {
        e.preventDefault()

        // console.log
        for (let i=from ;i<=to;i++){
            const data = await addRoom({
                ...room,
                name: `${props.block.name}-${(room.floor + 1) * 100 + i}`
            });
           
        }
        
        props.getRoomList();

    }


    console.log(room)
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
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">{props.block.name} : Add Room</h3>

                        <form className="space-y-6" action="#">


                            <div className="md:col-span-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Floor *</label>

                                <select
                                    name="floor"
                                    id="floor"
                                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    value={room.floor}
                                    onChange={(e: any) => {
                                        // console.log(e.target.value)
                                        setRoom({ ...room, floor: parseInt(e.target.value) })

                                    }}
                                >
                                    <option value={""}>--select floor --</option>
                                    {NoOfFloorArray.map((ele, index) => (
                                        <option key={index} value={index}>
                                            {index == 0 ? "Ground Floor" : "Floor-" + (index)}

                                        </option>
                                    ))}


                                </select>


                            </div>

                            {/* <div>
                                <label className="room mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Name *</label>
                                <input
                                    value={room.name}
                                    onChange={(e: any) => {
                                        const input = e.target.value;
                                        // Check if the input length is less than or equal to 2
                                        if (input.length <= 2) {
                                            // Update state with the prefixed value 'D-'
                                            // setInputValue(`D-${input}`);
                                            setRoom({ ...room, name:e.target.value })
                                        }
                                    }}
                                    type="text" name="name" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 room w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Name Surname" required />
                                <label className="room mb-2 text-sm font-medium text-gray-900 dark:text-white">{`${props.block.name}-${(room.floor+1)*100+parseInt(room.name)}`}</label>

                            </div> */}

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Room No From *</label>
                                <input
                                    value={from}
                                    onChange={(e: any) => {
                                        // setRoom({ ...room, noOfBeds: parseInt(e.target.value) })
                                        setfrom(parseInt(e.target.value))
                                    }}
                                    type="number" name="name" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Enter no of Floors" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To *</label>
                                <input
                                    value={to}
                                    onChange={(e: any) => {
                                        // setRoom({ ...room, noOfBeds: parseInt(e.target.value) })
                                        setto(parseInt(e.target.value))

                                    }}
                                    type="number" name="name" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Enter no of Floors" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter No of Beds *</label>
                                <input
                                    value={room.noOfBeds}
                                    onChange={(e: any) => {
                                        setRoom({ ...room, noOfBeds: parseInt(e.target.value) })
                                    }}
                                    type="number" name="name" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Enter no of beds" required />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rent Price *</label>
                                <input
                                    value={room.price}
                                    onChange={(e: any) => {
                                        setRoom({ ...room, price: parseInt(e.target.value) })
                                    }}
                                    type="number" name="name" id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Enter room rent" required />
                            </div>









                            <button
                                onClick={handleSubmitButton}
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Room</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add