import { nanoid } from "nanoid";

export function getNanoID(length = 10) {
  return nanoid(length);
}

export function getFileName(path: string) {
  return path.split("\\").pop()!.split("/").pop();
}

export function convertDateFormat(dateString: string) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date(dateString);
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${date} ${month} ${year}`;
}



export const getJwtToken = () => {
  return window.localStorage.getItem("jwt_token") ?? "";
};


export const SetJwtToken = (key: string) => {
  window.localStorage.setItem("jwt_token", key);
};


export function getInitials(name: string) {
  const names = name.split(" ");
  let initials = "";

  for (let i = 0; i < names.length; i++) {
    if (names[i].length > 0) {
      initials += names[i][0].toUpperCase();
    }
  }

  return initials.slice(0, 2);
}
