import React from "react";

// Admin Imports
// import NFTMarketplace from "views/admin/marketplace";
// import Profile from "views/admin/profile";
// import DataTables from "views/admin/tables";
// import RTLDefault from "views/rtl/default";

// Auth Imports
// import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdRecordVoiceOver,
  MdAccessibilityNew,
  MdAccountBox,
  MdAddHome

} from "react-icons/md";

export const admin_navigations = [
  // {
  //   name: "Main Dashboard",
  //   path: "/admin/dashboard",
  //   icon: <MdHome className="h-6 w-6" />,
  
  // },
  // {
  //   name: "Student List",
  //   // layout: "/admin",
  //   path: "/admin/student-list",
  //   icon: <MdAccessibilityNew className="h-6 w-6" />,
  //   secondary: true,
  // },
  // {
  //   name: "Ticket Raise",
  //   // layout: "/admin",
  //   icon: <MdRecordVoiceOver className="h-6 w-6" />,
  //   path: "/admin/ticket-raise",
  // },
 
 
];

export const superAdmin_navigations = [
  {
    name: "Hall Management",
    // layout: "/super-admin",
    path: "/chief-warden/hall-management",
    icon: <MdAddHome className="h-6 w-6" />,
    secondary: true,
  },
 
];
 
