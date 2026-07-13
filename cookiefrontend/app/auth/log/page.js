"use client";
import { useEffect, useState } from "react";
import { loginUser } from "../../../lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  // FIX 1: Use useState, not useEffect
  const [isLoading, setIsLoading] = useState(true);
       const router = useRouter()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const verifyUser = async () => {
    try {
        
      const loggedUser = await loginUser(userData); 
      console.log(loggedUser.user.email);
      console.log(loggedUser.user.password);

      
      if (loggedUser && loggedUser.user) {
        console.log("Login successful!");
        router.push(`/client/${loggedUser.user._id}`)
      }
    } catch (error) {
      console.error("Error at logging:", error);
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>

        <label className="block mb-4">
          <span className="text-black-700">Email</span>
          <input
            type="email"
            placeholder="name@example.com"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder-gray-500"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            placeholder="••••••••"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder-gray-500"
          />
        </label>

        <button
          onClick={verifyUser}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
