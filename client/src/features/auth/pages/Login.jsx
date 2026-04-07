import { Link } from "react-router";
import { useState } from "react";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { Loading, handleLogin } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin({ email, password });
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="button primary-button">Login</button>
        </form>

        <p>
          Don't have an Account? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </main>
  );
}
