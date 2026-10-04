import { useToast } from "../../context/ToastContext";

import "./Toast.css";

function Toast() {
  const { toast, hideToast } = useToast();

  if (!toast) {
    return null;
  }

  return (
    <div
      className={`toast toast-${toast.type}`}
      role="alert"
    >
      <div className="toast-icon">
        {toast.type === "success" && "✓"}
        {toast.type === "error" && "!"}
        {toast.type === "warning" && "!"}
        {toast.type === "info" && "i"}
      </div>

      <p>{toast.message}</p>

      <button
        className="toast-close"
        onClick={hideToast}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;

