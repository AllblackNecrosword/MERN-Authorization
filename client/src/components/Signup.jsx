import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState("");

  const inputhandler = (e) => {
    const { id, value } = e.target;
    setInput({
      ...input,
      [id]: value,
    });
  };

  const handleSubmit = async () => {
    const { email, password, confirmpassword } = input;
    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/jwt/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, confirmpassword }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register");
      }
      console.log(response);

      const data = await response.json();
      alert("Successfully Registered");
      setInput({
        email: "",
        password: "",
        confirmpassword: "",
      });
      // Optionally, handle the response data (e.g., save JWT, redirect)
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <div className="border p-6 w-80 rounded-3xl border-black-700 shadow-lg">
        <h1 className="text-center text-2xl font-bold my-8">Signup</h1>
        <div className="flex flex-col space-y-8">
          <input
            className="border p-2 w-full rounded-md"
            type="email"
            placeholder="Email"
            id="email"
            onChange={inputhandler}
            value={input.email}
          />
          <input
            className="border p-2 w-full rounded-md"
            type="password"
            id="password"
            placeholder="Password"
            onChange={inputhandler}
            value={input.password}
          />
          <input
            className="border p-2 w-full rounded-md"
            type="password"
            id="confirmpassword"
            placeholder="Confirm password"
            onChange={inputhandler}
            value={input.confirmpassword}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-blue-500 p-2 rounded-md my-4 text-white font-semibold hover:bg-blue-900"
          onClick={handleSubmit}
        >
          Create an account
        </button>
        <div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              to={"/login"}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
