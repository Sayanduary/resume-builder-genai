import { Link, useNavigate } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Loading, handleRegister } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ username, email, password });
    navigate("/");
  };

  if (Loading) {
    return (
      <main>
        <h1>loading...</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1 className="">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Your Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button className="button primary-button">Register</button>
        </form>
        <p>
          Already have an Account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
}
