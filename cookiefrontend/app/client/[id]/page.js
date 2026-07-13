"use client";
import { useEffect, useState } from 'react';
import {getUserInfos} from '../../../lib/api'
import Sidebar from '../../../components/Sidebar'
import Header from '../../../components/Header' 
import Footer from '../../../components/Footer';

export default function AuthPage() { 
   const [userInfos , setUserInfos] = useState({
      username: "",
    email: "",
    password: "",
    profession: "",
    wilaya: "",
    adress: "",
    NumTel: "",
   }) 
   const [loading, setLoading] = useState(true); 
   //first issues i forgot that async 
   const retreiveUserData  = async () => {
    try {
          const Response = await getUserInfos()
          if (!Response) {
            console.log("error at fetching user infos");
            
            return null
          }
          // Even after you fetch the data, your userInfos state is still empty.
          //  You need to call setUserInfos(Response) once you get the data back.
          setUserInfos(Response)
    } catch (error) {
        throw new Error(error);
    }finally {
        setLoading(false) // to not load again 
    }
   }
    // i need to trigger the fetch when the component is mounts 
    useEffect (()=>{
    
        retreiveUserData()
        // the empty array ensures that the useEffect runs  only once 
    }, [] )
  return (
  <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar takes fixed width and stays on the left */}
    <Sidebar />

    {/* This wrapper div stacks the Header, Main, and Footer vertically */}
    <div className="flex-1 flex flex-col">
      <Header />
      
      {/* Main content takes up all remaining vertical space */}
      <main className="flex-1 flex justify-center items-center p-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full text-center">
          <img
            src="/profile-placeholder.png"
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-md"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{userInfos.username}</h2>
          <p className="text-gray-500 mb-6">{userInfos.email}</p>
          <div className="space-y-3 text-left border-t pt-4">
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Phone:</span>
              <span className="text-gray-900">{userInfos.NumTel}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Address:</span>
              <span className="text-gray-900">{userInfos.adress}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Wilaya:</span>
              <span className="text-gray-900">{userInfos.wilaya}</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  </div>
);
}