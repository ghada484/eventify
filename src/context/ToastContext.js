import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, type = "success") => {
      setToast({
        id: Date.now(),
        message,
        type,
      });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    },
    []
  );

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

export default ToastProvider;

