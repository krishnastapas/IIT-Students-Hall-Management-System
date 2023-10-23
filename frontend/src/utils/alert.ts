import swal from "sweetalert";
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';





export const showMessage = (props: { message?: any, timer?: number, status?: number }) => {
  if (!props.timer) {
    props.timer = 3000;
  }

  if (!props.message) {
    toast.error("Internal server Error!", { theme: "colored" })
    return;
  }
  console.log(props.message);   // Only Dev
  props.status = props.status ?? 500
  if ((props.status > 199) && (props.status < 300)) {
    // okay
    toast.success(props.message, { theme: "colored" })

    return;
  } else if ((props.status > 399) && (props.status < 500)) {
    // warnning
    toast.warning(props.message, { theme: "colored" })
    return;

  } else if ((props.status > 499) && (props.status < 600)) {
    // error
    toast.error(props.message + " Error", { theme: "colored" })
    return;
  }

  return;
};

export const confirmationMessage = (message: any) => {
  return swal({
    text: `${message}`,
    icon: "warning",
    // buttons: true,
    dangerMode: true,
  });
};