import React, { useEffect, useState } from 'react'
import { HallInterface } from '../Model'
import { allotRoomToStudent, readEmptyRoomList, readStudentList } from '../repository'
import HallCard from './HallCard'
import { StudentInterface } from '../../student/Model'
import StudentCard from './StudentCard'
import HallAllotedCard from './HallAllotedCard'
import { useUserAuth } from '../../context/UserAuthContext'
import { RoomInterface } from '../../hallDetailsPage/presenter/room/Model'
import Table from './Table'

function Index() {

  const [roomList, setRoomList] = useState<RoomInterface[]>([])
  const [totalEmptyRoom, setTotalEmptyRoom] = useState<number>(0)
  const [studentList, setStudentList] = useState<StudentInterface[]>([])
  const [studentallotedList, setStudentAllotedList] = useState<StudentInterface[]>([])
  const [hallAllotedStudentsMap, setHallAllotedStudentsMap] = useState<Map<string, { _id: string, name: string, rollNumber: string }[]>>()

  const [hallAllotedList, setHallAllotedList] = useState<HallInterface[]>([])

  const { user } = useUserAuth()
  const fetchHallList = async () => {

    const data = await readEmptyRoomList(user._id ?? "")
    if (data) {
      setRoomList(data.roomList)
      setTotalEmptyRoom(data.totalRooms)
    }
  }

  const fetchStudentList = async () => {

    const data = await readStudentList(user._id ?? "")
    if (data) {
      setStudentList(data)
    }
  }

  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }




  function roomAllotment() {
    // Get an array of hall ids

    const shuffleStudentList = shuffleArray(studentList);
    console.log(shuffleStudentList)

    const allotedStudentList: StudentInterface[] = []

    let array = roomList;

    for (let i = 0; i < shuffleStudentList.length; i++) {
      const student = shuffleStudentList[i];
      if (array.length === 0) {
        break;
      }

      const randomIndex = Math.floor(Math.random() * array.length);
      const selectedRoom = array[randomIndex];

      // now allot the room to student
      allotedStudentList.push({ ...student, roomId: selectedRoom._id, blockId: selectedRoom.blockId, roomName: selectedRoom.name })

      // Update the selected room
      array[randomIndex] = { ...selectedRoom, noOfStudent: selectedRoom.noOfStudent + 1 }

      // Check if noOfStudent equals noOfBeds, and if so, remove the room
      if (selectedRoom.noOfStudent === selectedRoom.noOfBeds) {
        array.splice(randomIndex, 1);
      }


    }

    setStudentList(allotedStudentList)


  }




  const handleAllotButton = async () => {
    if (studentList) {

      console.log(studentList)

      const data = await allotRoomToStudent(studentList)
      if (data) {
        fetchHallList()
        fetchStudentList()
      }


    }
  }

  useEffect(() => {
    fetchHallList()
    fetchStudentList()
  }, [])

  console.log()

  return (

    <div>
      {/* Hall Card */}
      <div className='flex justify-around mt-5'>
        {/* <HallCard hallList={hallList} /> */}
        <StudentCard noOfStudent={studentList.length} text='Student Registered' />

        <StudentCard noOfStudent={totalEmptyRoom} text='Empty Rooms' />

      </div>
      <div className='flex justify-center m-10'>
        <button type="button"
          onClick={roomAllotment}
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Run algoritm</button>
      </div>
      <div>

        <div className='flex justify-around mt-5'>{
          hallAllotedStudentsMap && <HallAllotedCard
            hallList={hallAllotedList}
            hallAllotedStudentsMap={hallAllotedStudentsMap}
          />
        }

          {/* <StudentCard noOfStudent={studentallotedList.length} /> */}
          <Table studentList={studentList} />

        </div>
      </div>
      <div className='flex justify-center m-10'>
        <button type="button"
          onClick={handleAllotButton} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Allot Students</button>
      </div>
    </div>
  )
}

export default Index