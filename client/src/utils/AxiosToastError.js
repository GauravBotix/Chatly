import toast from "react-hot-toast";

const AxiosToastError = (error) => {
  if (error.response && error.response.data) {
    toast.error(error.response.data.message || "Something went wrong!");
  } else {
    toast.error("Network Error or Server Down");
  }
  console.error(error);
};

export default AxiosToastError;
