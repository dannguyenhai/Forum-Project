import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const notifySuccess = () => {
    toast.success("🦄 welcome!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
export const notifyFail = () => {
    toast.warn("🦄 Something wrong!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };