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
  MdAddHome,
  MdHome

} from "react-icons/md";

export const hall_navigations = [
  {
    name: "Hall Details",
    path: "/warden/dashboard",
    icon: <MdHome className="h-6 w-6" />,

  },
  {
    name: "Student List",
    // layout: "/admin",
    path: "/warden/student-list",
    icon: <MdAccessibilityNew className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: "Room allotment",
    // layout: "/admin",
    icon: <MdRecordVoiceOver className="h-6 w-6" />,
    path: "/warden/room-allotment",

  },
  {
    name: "Room Change Request",
    // layout: "/admin",
    icon: <MdRecordVoiceOver className="h-6 w-6" />,
    path: "/warden/room-change-request",
  },


];

export const superAdmin_navigations = [
  {
    name: "Student Management",
    // layout: "/super-admin",
    path: "/chief-warden/student-list",
    icon: <MdAccountBox className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: "Hall Management",
    // layout: "/super-admin",
    path: "/chief-warden/hall-management",
    icon: <MdAddHome className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: "Mess Management",
    // layout: "/super-admin",
    path: "/chief-warden/mess-list",
    icon: <MdAddHome className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: "Hall Allotment",
    // layout: "/super-admin",
    path: "/chief-warden/hall-allotment",
    icon: <MdAddHome className="h-6 w-6" />,
    secondary: true,
  },

];
export const mess_navigations = [


];
export const student_navigations = [
  {
    name: "Student Information",
    // layout: "/admin",
    icon: <MdRecordVoiceOver className="h-6 w-6" />,
    path: "/student/dashboard",
  }, {
    name: "Room Change Request",
    // layout: "/admin",
    icon: <MdRecordVoiceOver className="h-6 w-6" />,
    path: "/student/room-change-request",
  },
  

];


