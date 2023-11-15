import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../context/UserAuthContext'
import { readHallList } from '../../hall/repository'
import { HallInterface } from '../../hall/Model';
import { MessInterface } from '../../mess/Model';
import { readMessList } from '../../mess/repository';

function Index() {

  const { user } = useUserAuth();
  const [hallList, setHallList] = useState<HallInterface[]>()
  const [messList, setMessList] = useState<MessInterface[]>()

  const fetchHallList = async () => {
    const data = await readHallList()
    if (data) {
      setHallList(data)
    }
  }

  const fetchMessList = async () => {
    const data = await readMessList()
    if (data) {
      setMessList(data)
    }
  }

  useEffect(() => {
    fetchHallList();
    fetchMessList()
  }, [])

  return (
    <div><div className="m-10 bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">

      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Full name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Roll Number
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.rollNumber}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Email
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.email}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Phone Numnber
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.phoneNumber}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Department
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.department}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Course name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.courseName}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Hall name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.hallId ?
                hallList?.map((ele) => {
                  if (ele._id == user.hallId) {
                    return (
                      <>{ele.name}</>
                    )
                  }
                }) : "---"}
            </dd>
          </div>

          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Mess name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.messId ?
                messList?.map((ele) => {
                  if (ele._id == user.messId) {
                    return (
                      <>{ele.name}</>
                    )
                  }
                }) : "---"}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">

              Address
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {user.address}  </dd>
          </div>
        </dl>
      </div>
    </div></div>
  )
}

export default Index