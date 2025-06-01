import axios from "../api/axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { username, email, password });
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  }
  return (
    <div className=" max-w-md mx-auto mt-10 p-6 shadow-lg bg-gray-200 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      {error && <p className="text-red-500 my-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className=" flex flex-col gap-5 ">
          <div>
            <label htmlFor="" className="font-semibold">
              Username:
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="bg-white w-full py-1 px-4 rounded"
            />
          </div>
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
          Register
        </button>
      </form>
      <p className="text-center text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}

export default Register;
