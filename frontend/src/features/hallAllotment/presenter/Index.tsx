import React, { useEffect, useState } from 'react'
import { HallInterface } from '../Model'
import { allotHallStudent, readHallLists, readStudentList } from '../repository'
import HallCard from './HallCard'
import { StudentInterface } from '../../student/Model'
import StudentCard from './StudentCard'
import HallAllotedCard from './HallAllotedCard'

function Index() {

  const [hallList, setHallList] = useState<HallInterface[]>([])
  const [studentList, setStudentList] = useState<StudentInterface[]>([])
  const [studentallotedList, setStudentAllotedList] = useState<StudentInterface[]>([])
  const [hallAllotedStudentsMap, setHallAllotedStudentsMap] = useState<Map<string, { _id: string, name: string, rollNumber: string }[]>>()

  const [hallAllotedList, setHallAllotedList] = useState<HallInterface[]>([])

  const fetchHallList = async () => {

    const data = await readHallLists()
    if (data) {
      setHallList(data)
      setHallAllotedList(data)
    }
  }

  const fetchStudentList = async () => {

    const data = await readStudentList()
    if (data) {
      setStudentList(data)
    }
  }




  async function allotHallsRandomly() {

    console.log("asdkjfbkdsjbfkljslb")
    // // Shuffle the students array

    const modifiedHallList: { [key: string]: number } = {};

    for (let i = 0; i < hallList.length; i++) {
      modifiedHallList[hallList[i]._id] = hallList[i].noOfEmptyRooms;
    }
    console.log(modifiedHallList)
    let hallAllocation: Map<string, { _id: string, name: string, rollNumber: string }[]> = new Map();

    // // Shuffle the array of students randomly
    const shuffledStudents: StudentInterface[] = shuffleArray(studentList);

    console.log(shuffledStudents)

    const allotedStudents: StudentInterface[] = []
    // // Iterate over the shuffled students and allocate halls
    for (let i = 0; i < shuffledStudents.length; i++) {
      let student = shuffledStudents[i];
      // console.log(student)
      const hallId = getRandomHall(modifiedHallList);

      console.log(i)
      console.log(hallId)
      // Check if there are available rooms in the selected hall
      if (modifiedHallList[hallId] > 0) {

        allotedStudents.push({ ...student, hallId: hallId })
        // Allocate the hall to the student
        if (!hallAllocation.has(hallId)) {

          hallAllocation.set(hallId, []);
        }
        hallAllocation.get(hallId)!.push({ _id: student._id ?? "", name: student.name, rollNumber: student.rollNumber });

        // Decrease the available rooms in the selected hall
        modifiedHallList[hallId]--;

      }
    }
    // shuffledStudents.forEach((student) => {
    //   const hallId = getRandomHall(modifiedHallList);

    //   // Check if there are available rooms in the selected hall
    //   if (modifiedHallList[hallId] > 0) {
    //     // Allocate the hall to the student
    //     if (!hallAllocation.has(hallId)) {
    //       hallAllocation.set(hallId, []);
    //     }
    //     hallAllocation.get(hallId)!.push({ _id: student._id ?? "", name: student.name });

    //     // Decrease the available rooms in the selected hall
    //     modifiedHallList[hallId]--;
    //   }
    // });

    console.log(hallAllocation)
    console.log(allotedStudents)
    setStudentAllotedList(allotedStudents)
    setHallAllotedStudentsMap(hallAllocation)
    const data: HallInterface[] = []
    for (let i = 0; i < hallAllotedList.length; i++) {
      // if(hallAllotedList[i]._id)
      const objects = hallAllocation.get(hallAllotedList[i]._id) || [];

      data.push({
        ...hallAllotedList[i],
        noOfAlloted: objects.length
      });

    }
    setHallAllotedList(data)

    // return hallAllocation;
  }


  function getRandomHall(hallMap: { [key: string]: number }): string {
    // Get an array of hall ids

    const availableHalls = Object.keys(hallMap).filter(hallId => hallMap[hallId] > 0);

    // Check if there are any halls with available rooms
    if (availableHalls.length === 0) {
      return ""; // No available halls
    }

    // Choose a random hall from the array of available halls
    const randomIndex = Math.floor(Math.random() * availableHalls.length);
    const randomHallId = availableHalls[randomIndex];

    // Decrease the available rooms in the selected hall
    hallMap[randomHallId]--;

    // Return the selected hall
    return randomHallId;
  }

  function shuffleArray(array: any[]): any[] {
    // Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  // );


  // console.log(allo)


  const handleAllotButton = async () => {
    if (hallAllotedStudentsMap) {

  
      const data = await allotHallStudent(studentallotedList)

      if(data){
        fetchStudentList()
        fetchHallList()
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
        <HallCard hallList={hallList} />
        <StudentCard noOfStudent={studentList.length} />

      </div>
      <div className='flex justify-center m-10'>
        <button type="button"
          onClick={allotHallsRandomly} className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Run algoritm</button>
      </div>
      <div>

        <div className='flex justify-around mt-5'>{
          hallAllotedStudentsMap && <HallAllotedCard
            hallList={hallAllotedList}
            hallAllotedStudentsMap={hallAllotedStudentsMap}
          />
        }

          {/* <StudentCard noOfStudent={studentallotedList.length} /> */}

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