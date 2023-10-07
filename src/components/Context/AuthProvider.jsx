import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  user: "",
  isAuthenticated: false,
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { user: action.payload, isAuthenticated: true };
    case "logout":
      return { user: null, isAuthenticated: false };
    default:
      throw new Error("UnKnown Actions");
  }
};

const [{ user, isAuthenticated }, dispatch] = useReducer(
  AuthReducer,
  initialState
);

const FAKE_USER = {
  name: "zahra",
  email: "zahra.khodadad50@yahoo.com",
  password: "1234",
};

const login = () => {
  if (user.name === FAKE_USER.name && user.email === FAKE_USER.email)
    dispatch({ type: "login", payload: FAKE_USER });
};
const logout = () => {
  dispatch({ type: "logout" });
};

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

const useAuth = () => useContext(AuthContext);
