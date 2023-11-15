import React from 'react'
import { HallInterface } from '../Model'

function HallCard(props: { hallList: HallInterface[] }) {
    return (




        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Halls</h5>
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Empty Rooms</h5>
          {/* <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Alloted</h5> */}

        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {props.hallList.map((hall) => {
              return (
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {hall.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {hall.warden_incharge}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {hall.noOfEmptyRooms}
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {hall.noOfAlloted}
                    </div>
                  </div>
                </li>
              )
            })}



          </ul>
        </div>
      </div>


    )
}

export default HallCard