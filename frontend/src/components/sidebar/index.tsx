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
      if (user.permissionNo == 1000) {
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
          HMS
          {/* <span className="font-medium"> Registration <br />Portal</span> */}
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
