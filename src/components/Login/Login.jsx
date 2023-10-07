import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="email">user</label>
          <input
            type="text"
            name="email"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">password</label>
          <input
            type="text"
            name="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
