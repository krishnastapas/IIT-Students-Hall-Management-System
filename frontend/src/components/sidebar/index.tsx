/* eslint-disable */
import React from "react"
import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "../../components/sidebar/componentsrtl/SidebarCard";
// import routes from "../../component/Layout/routes";
import { admin_navigations, superAdmin_navigations } from "../../navigation";
import { navigationInterface } from "../../features/Model";
import { useUserAuth } from "../../features/context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../../features/auth/authRoles";

const Sidebar = (props: { open: any, onClose: any }) => {

  // let navigations: navigationInterface[] = []
  const navigate = useNavigate()
  const [navigations, setNavigations] = React.useState<navigationInterface[]>([])
  const { user } = useUserAuth()
  React.useEffect(() => {
    if (user) {
      if (user.permissionNo == 4000) {
        setNavigations(superAdmin_navigations)
      }
      if (user.permissionNo == 3000) {
        setNavigations(admin_navigations)
      }
    }

  }, [])

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${props.open ? "translate-x-0" : "-translate-x-96"
        }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={props.onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Pathtex
          {/* <span className="font-medium"> Registration <br />Portal</span> */}
        </div>

      </div>
      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          {/* <button
          type="button"
          className="inline-block rounded-full bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
          Primary
        </button> */}
          {user.operation == "show-edit" || user.operation == "show" ? "" :

            <button
              type="button"
              onClick={() => {
                const role = getUserRole({ user: user })
                navigate(`/${role}/student-list/add`)
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600  dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Add Student
            </button>
          }
        </div>
      </div>


      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={navigations} />
      </ul>

      {/* Free Horizon Card */}
      {/* <div className="flex justify-center">
        <SidebarCard />
      </div> */}

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
