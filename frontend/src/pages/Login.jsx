import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      login(response.data.token);
      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  }
  return (
    <div className=" max-w-md mx-auto mt-10 p-6 shadow-lg bg-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      {error && <p className="text-red-500 my-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className=" flex flex-col gap-5 ">
          <div>
            <label htmlFor="" className="font-semibold">
              Email:
            </label>
            <input
              type="emial"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white w-full py-1 px-4 rounded"
            />
          </div>
          <div>
            <label htmlFor="" className="font-semibold">
              Password:
            </label>
            <input
              type="password"
              placeholder="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white w-full py-1 px-4 rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 my-4 rounded hover:bg-blue-800"
        >
          Login
        </button>
      </form>
      <p className="text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;
