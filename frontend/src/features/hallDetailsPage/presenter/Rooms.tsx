import React from 'react'

import RoomList from "./block/presenter/Index"

function Rooms() {
  return (
    <div>
      <RoomList />
      <div className='flex jusify-center'>

        <div className="relative box-content h-7 w-9 p-4 border-4 " style={{ backgroundColor: "#4caf50" }}>
          <button className="absolute top-0 right-0 p-1 text-red-500" onClick={() => {
            // onClickCross(room)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-3 w-3">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-xs">{ }</span>
        </div>
        <span>Full</span>
        <div className="relative box-content h-7 w-9 p-4 border-4 " style={{ backgroundColor: "#ffd700" }}>
          <button className="absolute top-0 right-0 p-1 text-red-500" onClick={() => {
            // onClickCross(room)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-3 w-3">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-xs">{ }</span>
        </div>
        <span>Partially filled</span>

        <div className="relative box-content h-7 w-9 p-4 border-4 " style={{ backgroundColor: "#f2f2f2" }}>
          <button className="absolute top-0 right-0 p-1 text-red-500" onClick={() => {
            // onClickCross(room)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-3 w-3">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <span className="text-xs">{ }</span>
        </div>
        <span>Empty</span>
      </div>
    </div>
  )
}

export default Rooms