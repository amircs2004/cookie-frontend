"use client";
import { useEffect, useState } from "react";
import { getUserInfos } from "../../../lib/api";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [userInfos, setUserInfos] = useState({
    username: "",
    email: "",
    password: "",
    profession: "",
    wilaya: "",
    adress: "",
    NumTel: "",
  });
  const [loading, setLoading] = useState(true);
  //first issues i forgot that async

  const retreiveUserData = async () => {
    try {
      const Response = await getUserInfos();
      if (!Response) {
        console.log("error at fetching user infos");
       // router.push("/auth/log");
        return null;
      }
      // Even after you fetch the data, your userInfos state is still empty.
      //  You need to call setUserInfos(Response) once you get the data back.
      setUserInfos(Response);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false); // to not load again
    }
  };
  // i need to trigger the fetch when the component is mounts
  useEffect(() => {
    retreiveUserData();

    // the empty array ensures that the useEffect runs  only once
  }, [router]);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 flex justify-center items-center p-6">
          {/* Container with subtle shadow and border */}
          <div className="bg-white border border-gray-100 shadow-xl shadow-gray-200/50 rounded-3xl p-10 max-w-sm w-full text-center transition-all hover:shadow-2xl">
            {/* Avatar Section */}
            <div className="relative inline-block mb-6">
              <img
                src="/profile-placeholder.png"
                alt="Profile Avatar"
                className="w-32 h-32 rounded-2xl mx-auto object-cover border-4 border-white shadow-lg ring-2 ring-gray-100"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>

            {/* User Info */}
            <h2 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">
              {userInfos.username}
            </h2>
            <p className="text-blue-600 font-medium mb-8 text-sm uppercase tracking-wider">
              {userInfos.email}
            </p>

            {/* Details Grid */}
            <div className="space-y-4 text-left border-t border-gray-50 pt-6">
              {[
                { label: "Phone", value: userInfos.NumTel },
                { label: "Address", value: userInfos.adress },
                { label: "Wilaya", value: userInfos.wilaya },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded-xl"
                >
                  <span className="text-sm font-semibold text-gray-500">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
