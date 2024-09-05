import React, { useEffect, useState } from 'react'
import TestTable from './Table'
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';
import { readRoomChangeRequestList } from '../repository';
import Add from './Add';
// import Edit from './Edit';
import { RoomChangeRequestInterface } from '../Model';
import Table from './Table';
import { readHallList } from '../../hall/repository';
import { HallInterface } from '../../hall/Model';

const tabList = [
  {
    id: 1,
    name: "Create Request",
  },
  {
    id: 2,
    name: "Previous Request",
  },

]

function Index() {
  const navigate = useNavigate();
  const { user } = useUserAuth()
  const [showModal, setShowModal] = useState("")
  const initialvalue: RoomChangeRequestInterface = {
    _id: "",
    comment: "",
    date_time_action: "",
    date_time_applied: "",
    hallId: "",
    hallName: "",
    isAccepted: false,
    reasonForChange: "",
    roomId: "",
    roomName: "",
    status: "",
    studentId: ""

  }

  const [currentTab, setCurrentTab] = useState(1)

  const [currentRoomChangeRequest, setCurrentRoomChangeRequest] = useState<RoomChangeRequestInterface>(initialvalue)

  const [showFilterOption, setShowFilterOption] = useState(false);
  const [siteFilter, setSiteFilter] = useState("all")
  const [centreFilter, setCentreFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const [roomChangeRequestList, setRoomChangeRequestList] = useState<RoomChangeRequestInterface[]>([])

  // const [totalNoOfTest, setTotalNoOfTest] = useState(0)

  // const [page, setPage] = useState(1)
  // const [limit, setLimit] = useState(10)

  const handleEditButton = (roomChangeRequest: RoomChangeRequestInterface) => {
    setCurrentRoomChangeRequest(roomChangeRequest);
    setShowModal("edit")
  }
  // const handleActiveButton = (value:boolean,test:TestInterface) => {
  //   test
  // }



  const fetchRoomChangeRequestList = async () => {
    const data = await readRoomChangeRequestList(user._id??"")
    // console.log(data)
    setRoomChangeRequestList(data)
  }

  const [hallList, setHallList] = useState<HallInterface[]>([])

  const fetchHallList = async () => {
    const data = await readHallList()
    // console.log(data)
    setHallList(data)
  }




  useEffect(() => {
    fetchHallList()

    fetchRoomChangeRequestList()

  }, [siteFilter, searchQuery, centreFilter,])
  return (
    <div>
      
      <Table
        roomChangeRequestList={roomChangeRequestList}
        fetchRoomChangeRequestList={fetchRoomChangeRequestList}/>

      



    </div>
  )
}

export default Index