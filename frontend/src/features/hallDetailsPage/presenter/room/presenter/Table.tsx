import React, { useEffect, useState } from "react";
import { TECollapse } from "tw-elements-react";
import { BlockInterface } from "../../block/Model";
import { RoomInterface } from "../Model";
import { deleteRoomApi } from "../repository";
import { confirmationMessage } from "../../../../../utils/alert";
function Table(props: {
    block: BlockInterface,
    roomList: RoomInterface[],
    fetchRoomList: () => void
}) {

    const NoOfFloorArray = new Array(props.block.noOfFloors).fill([]);

    const onClickCross = async (room: RoomInterface) => {
        const flag = await confirmationMessage("Do you really want to delete the Room  ?");
        if (flag) {
            const data = await deleteRoomApi(room._id ?? "");
            if (data) {
                props.fetchRoomList()
            }
        }

    }


    console.log(NoOfFloorArray)
    return (
        <div >


            {NoOfFloorArray.map((ele, index) => {
                return (
                    <div>
                        < h2 id="accordion-open-heading-1" >
                            {index == 0 ? "Ground Floor" : "Floor-" + (index)}
                        </h2 >

                        <div className="flex flex-wrap">
                            {props.roomList.map((room) => {
                                if (room.floor == index) {
                                    let color: string = "#f2f2f2"
                                    if (room.noOfBeds == room.noOfStudent) {
                                        color = "#4caf50"
                                    } else if (room.noOfStudent >= 1) {
                                        color = "#ffd700"
                                    }
                                    return (
                                        <div className="relative box-content h-7 w-9 p-4 border-4 " style={{ backgroundColor: color }}>
                                            <button className="absolute top-0 right-0 p-1 text-red-500" onClick={() => {
                                                onClickCross(room)
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-3 w-3">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            <span className="text-xs">{room.name}</span>
                                        </div>

                                    )
                                }
                            })}

                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Table




{ }
