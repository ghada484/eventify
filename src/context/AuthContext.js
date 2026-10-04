import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("eventify-user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "eventify-user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("eventify-user");
    }
  }, [user]);

  const login = (email, password, role) => {
    const savedUsers =
      JSON.parse(
        localStorage.getItem("eventify-users")
      ) || [];

    const existingUser = savedUsers.find(
      (item) =>
        item.email === email &&
        item.password === password &&
        item.role === role
    );

    if (!existingUser) {
      return {
        success: false,
        message: "Invalid email, password, or account type.",
      };
    }

    setUser({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    });

    return {
      success: true,
      user: existingUser,
    };
  };

  const register = (name, email, password, role) => {
    const savedUsers =
      JSON.parse(
        localStorage.getItem("eventify-users")
      ) || [];

    const emailExists = savedUsers.some(
      (item) => item.email === email
    );

    if (emailExists) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
    };

    const updatedUsers = [
      ...savedUsers,
      newUser,
    ];

    localStorage.setItem(
      "eventify-users",
      JSON.stringify(updatedUsers)
    );

    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    });

    return {
      success: true,
      user: newUser,
    };
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;