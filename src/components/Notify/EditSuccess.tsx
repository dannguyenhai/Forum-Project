import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const EditSuccess = () => {
    toast.success("Edit Succeeded !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
export const CreateSuccess = () => {
    toast.success("Create Succeeded !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
