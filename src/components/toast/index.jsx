import { useContext } from "react";
import { toastContext } from "../../contexts/toastContext";
import { ToastContainer } from "./components";

const Toast = () => {
  const { toast, setToast } = useContext(toastContext);

  setTimeout(() => {
    setToast({ open: false });
  }, 5000);

  if (!toast.open) {
    return null;
  }

  return (
    <ToastContainer
      type={toast.type}
      className={`toast ${toast.open ? "show" : ""}`} // Change `class` to `className`
    >
      <div className="toast-content">
        {toast.type === "success" && <i className="fa-solid fa-check icon"></i>} {/* Change `class` to `className` */}
        {toast.type === "error" && <i className="fa-solid fa-x-mark icon"></i>} {/* Change `class` to `className` */}
        {toast.type === "info" && <i className="fa-solid fa-info icon"></i>} {/* Change `class` to `className` */}
        <div className="message">
          <span className="text text-1">{toast.title}</span>
          <span className="text text-2">{toast.message}</span>
        </div>
      </div>
      <div className="progress"></div>
    </ToastContainer>
  );
};

export default Toast;
