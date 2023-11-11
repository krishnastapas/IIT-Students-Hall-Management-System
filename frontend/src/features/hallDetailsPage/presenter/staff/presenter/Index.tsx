import React, { useEffect, useState } from 'react'
import TestTable from './Table'
import { useNavigate, useParams } from 'react-router-dom';
import { useUserAuth } from '../../../../context/UserAuthContext';
import { readStuffList } from '../repository';
import Add from './Add';
// import Edit from './Edit';
import { StaffInterface } from '../Model';
import Table from './Table';
import Edit from './Edit';

function Index() {
  const navigate = useNavigate();
  const { user } = useUserAuth()
  const [showModal, setShowModal] = useState("")
  const { id } = useParams()
  const initialvalue: StaffInterface = {
    hallId: id ?? "",
    date_of_joining: "",
    date_time: "",
    designation: "",
    dob: "",
    email: "",
    image: "",
    name: "",
    password: "",
    salary: 0,
    salaryType: "",
  }
  const [currentStaff, setCurrentStaff] = useState<StaffInterface>(initialvalue)

  const [showFilterOption, setShowFilterOption] = useState(false);
  const [siteFilter, setSiteFilter] = useState("all")
  const [centreFilter, setCentreFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const [staffList, setStaffList] = useState<StaffInterface[]>([])

  // const [totalNoOfTest, setTotalNoOfTest] = useState(0)

  // const [page, setPage] = useState(1)
  // const [limit, setLimit] = useState(10)

  const handleEditButton = (staff: StaffInterface) => {
    setCurrentStaff(staff);
    setShowModal("edit")
  }
  // const handleActiveButton = (value:boolean,test:TestInterface) => {
  //   test
  // }



  const fetchStaffList = async () => {
    const data = await readStuffList()
    // console.log(data)
    setStaffList(data)
  }



  useEffect(() => {
    fetchStaffList()

  }, [siteFilter, searchQuery, centreFilter,])
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
        <div className="w-full md:w-1/2">
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                onChange={(event) => {
                  setSearchQuery(event.target.value)
                }}
                type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" />
            </div>
          </form>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
          {user.operation == "show-edit" || user.operation == "show" ? "" : <button
            onClick={() => {
              setShowModal("add")
            }}
            type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            Add staff
          </button>}


        </div>
      </div>
      <Table
        fetchStaffList={fetchStaffList}
        handleEditButton={handleEditButton}
        staffList={staffList}

      // handleActiveButton={handleActiveButton}
      />

      {showModal == "add" ? <Add
        getStaffList={fetchStaffList}
        onClose={() => setShowModal("")}

      /> : ""}

      {showModal == "edit" ? <Edit
        getStaffList={fetchStaffList}
        onClose={() => setShowModal("")}
        staff={currentStaff}
      /> : ""}

      {/* {showModal == "showQuestionPaper" ?
        <ShowquestionPaper
          onClose={() => setShowModal("")}
          test={currentTest}


        /> : ""} */}
    </div>
  )
}

export default Index