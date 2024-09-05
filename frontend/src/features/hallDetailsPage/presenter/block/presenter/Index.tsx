import React, { useEffect, useState } from 'react'
import Add from './Add'
import { BlockInterface } from '../Model'
import { readBlockList } from '../repository'
import Table from './Table'
import { useParams } from 'react-router-dom'
import Edit from './Edit'

function Index() {

  const [showModal, setShowModal] = useState("")

  const [blockList, setBlockList] = useState<BlockInterface[]>([])
  const [currentBlock, setCurrentBlock] = useState<BlockInterface>({
    date_time: "",
    hallId: "",
    name: "",
    noOfFloors: 0
  })
  const { id } = useParams();



  const fetchBlockList = async () => {
    const data = await readBlockList({ hallId: id ?? "" });
    if (data) {
      setBlockList(data)
    }
  }

  const hadleEditButton = async (block: BlockInterface) => {
    setCurrentBlock(block)
    setShowModal("edit");
  }

  useEffect(() => {

    fetchBlockList();

  }, [])
  return (
    <div>
      <div className="flex">
        <div className="ml-auto">
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            {/* {user.operation == "show-edit" || user.operation == "show" ? "" : */}
            <button
              onClick={() => {
                setShowModal("add")
              }}
              type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
              <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
              </svg>
              Add Block
            </button>


            {/* } */}


          </div>
        </div>
      </div>

      <Table
        blockList={blockList}
        handleEditButton={hadleEditButton}
      />
      {showModal == "add" ? <Add
        getBlockList={fetchBlockList}
        onClose={() => setShowModal("")}
      /> : ""}

      {showModal == "edit" ?
        <Edit
          block={currentBlock}
          getBlockList={fetchBlockList}
          onClose={()=>setShowModal("")}
        /> : ""} ̰
    </div>
  )
}

export default Index