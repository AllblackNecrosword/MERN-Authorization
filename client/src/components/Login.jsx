
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputhandler = (e) => {
    const { id, value } = e.target;
    setInput({
      ...input,
      [id]: value,
    });
  };

  const submithandler = async () => {
    const { email, password } = input;
    try {
      const response = await fetch("http://localhost:5000/jwt/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials:"include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login");
      }

      const data = await response.json();
      alert("Successfully Logged In");
      navigate("/"); // Redirect to home page
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <div className="border p-6 w-80 rounded-3xl border-black-700 shadow-lg">
        <h1 className="text-center text-2xl font-bold my-8">Login</h1>
        <div className="flex flex-col space-y-8">
          <input
            id="email"
            value={input.email}
            className="border p-2 w-full rounded-md"
            type="email"
            placeholder="Email"
            onChange={inputhandler}
          />

          <input
            id="password"
            value={input.password}
            className="border p-2 w-full rounded-md"
            type="password"
            placeholder="Password"
            onChange={inputhandler}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-blue-500 p-2 rounded-md my-4 text-white font-semibold hover:bg-blue-900"
          onClick={submithandler}
        >
          Login
        </button>
        <div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
