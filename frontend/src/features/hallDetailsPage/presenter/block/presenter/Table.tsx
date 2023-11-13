import React, { useState } from "react";
import { TECollapse } from "tw-elements-react";
import { BlockInterface } from "../Model";
import Room from "../../room/presenter/Index"
import Edit from "./Edit";
function Table(props: {
    blockList: BlockInterface[],
    handleEditButton: (block: BlockInterface) => void
}) {

   
    return (
        <div>

            <div id="accordion-open" data-accordion="open" className="divide-y divide-dashed">
                {props.blockList.map((block) => (
                    <div className="">
                        <div className="flex">
                            <h1 className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-xl lg:text-xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Block-{block.name}
                            </span>
                            </h1>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-gray-500 hover:cursor-pointer"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                onClick={() => {
                                        props.handleEditButton(block)
                                }}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 13.707a1 1 0 010-1.414l8-8a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-2-2z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M11 7a1 1 0 100-2 1 1 0 000 2zM14 10a1 1 0 11-2 0 1 1 0 012 0zM6 18a2 2 0 01-2-2c0-1.1.9-2 2-2h8a2 2 0 012 2c0 1.1-.9 2-2 2H6z"
                                    clipRule="evenodd"
                                />
                            </svg>

                        </div>
                        <Room block={block} />
                    </div>
                ))}


            </div>


        </div >
    )
}

export default Table




{ }
