import React, { useEffect, useState } from 'react'
import { HallInterface } from '../../hall/Model'
import { editHall } from '../../hall/repository'

function Profile(
  props: {
    hall: HallInterface,
    fetchHall: () => void
  }
) {

  const [hall,
     setHall] = useState<HallInterface>(props.hall)


     const handleEditHall=async()=>{
      const data=await editHall(hall);
      if(data){
        props.fetchHall()
      }
     }

  useEffect(() => {
    setHall(props.hall)

  }, [props.hall])


  console.log(hall)

  return (
    <div>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            {/* <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2> */}
            {/* <p className="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p> */}

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">About</label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={hall?.about}
                  onChange={(e: any) => {
                    setHall({ ...hall, about: e.target.value })
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the Hall.</p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Warden Name</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input 
                    type="text" 
                    name="username" 
                    value={hall.warden_incharge}
                    onChange={(e: any) => {
                      setHall({ ...hall, warden_incharge: e.target.value })
                    }}
                    id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Warden Name" />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Warden Email</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="email" 
                     value={hall.wardenEmail}
                     onChange={(e: any) => {
                       setHall({ ...hall, wardenEmail: e.target.value })
                     }}
                     name="username" id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Warden Email" />
                  </div>

                </div>
              </div>

              <button type="button" style={{ height: "35px", width: "140px" }} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Set Password</button>





            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">


            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Care Taker Name</label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input 
                    type="text" 
                    value={hall.care_taker}
                    onChange={(e: any) => {
                      setHall({ ...hall, care_taker: e.target.value })
                    }}
                    name="username" id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Name.." />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  General Secretory
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                     value={hall.generalSecretory}
                     onChange={(e: any) => {
                       setHall({ ...hall,generalSecretory: e.target.value })
                     }}
                      name="username" id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter name" />
                  </div>

                </div>
              </div>


              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Cultural Secretory
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input 
                     value={hall.culuralSecretary}
                     onChange={(e: any) => {
                       setHall({ ...hall,culuralSecretary: e.target.value })
                     }}
                      name="username" id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter name" />
                  </div>

                </div>
              </div>


              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Environmental Secretory
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="name"
                     value={hall.environmentalSecretory}
                     onChange={(e: any) => {
                       setHall({ ...hall,environmentalSecretory: e.target.value })
                     }}
                      name="username" id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter name" />
                  </div>

                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Maintainance Secretory
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="name"
                     value={hall.maintainanceSecretory}
                     onChange={(e: any) => {
                       setHall({ ...hall,maintainanceSecretory: e.target.value })
                     }}
                      name="username" id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter name" />
                  </div>

                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Sports Secretory
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="name"
                     value={hall.sportSecretary}
                     onChange={(e: any) => {
                       setHall({ ...hall,sportSecretary: e.target.value })
                     }}
                      name="username" id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter name" />
                  </div>

                </div>
              </div>



            </div>
          </div>


        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button> */}
          <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleEditHall}
          >Save</button>
        </div>
      </form>

    </div>
  )
}

export default Profile