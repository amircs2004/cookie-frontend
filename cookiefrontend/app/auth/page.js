"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { register } from "../../lib/api";
import Link from "next/link";

let data;
const profession = [
  "(Médecine) Spécialiste",
  "(Médecine) Professeur",
  "Acheteur",
  "Administrateur",
  "Affairiste",
  "Agent Administratif",
  "Agent Commercial",
  "Agent d'Entretien Espace Vert",
  "Agent d'Entretien et Nettoyage",
  "Agent de Bureau",
  "Agent de Cantine",
  "Agent de Recouvrement",
  "Agent de Reprographie",
  "Agent de Transit",
  "Agent Formation Plaques",
  "Agent Immobilier",
  "Agent Sécurité & Surveillance",
  "Aide Conducteur Engins",
];

const wilayas = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
];

export default function AuthPage() {
  //styleing use tail wind
  const inputStyle =
    "w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  //
  //define the useRoute companant drama
  const router = useRouter(); //now that i have to add this router inside that hundleSubmit

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    profession: "",
    wilaya: "",
    adress: "",
    NumTel: "",
  });
  const [isRegisted, setIsRegistered] = useState(false);

  //ONE SIBGLE HANDLER FOR?ALL INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };
  /*
useEffect(()=> {
   try {
       const sendDataToDataBase = await register(userData) 
    
   } catch (error) {
      console.log('error at register ');
      
   }

}, [setUserData])
*/
  //the error is in here
  //WE DONT USE useEffect for submision !
  const hunbleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register(userData);
      // console.log("DEBUG - Full registration response:", result);

      setIsRegistered(true);

      /*  localStorage.setItem('token', result.token);
      if (result) {
        //?
        router.push(`/client/${result.data._id}`)
      }else{
        console.error("Result missing ID:", result);
      alert("Registration successful, but profile ID missing.");
      }
      */
      if (result.token) {
        localStorage.setItem("token", result.token); // Save it here
        console.log("DEBUG - Token saved:", localStorage.getItem("token"));
        router.push(`/client/${result.data._id}`); // Then navigate
      } else {
        console.error("No token found in response!");
      }
      

      console.log("registered:", result);
    } catch (error) {
      console.error("Registration error:", error.message);
      alert(error.message); // Show the error to the user
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={hunbleSubmit}>
          <div>
            <label className={labelStyle} htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className={labelStyle} htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              // i need to add these little
              name="email"
              value={userData.email}
              onChange={handleChange}
              className={inputStyle}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className={labelStyle} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              // i need to add this to stop the 500 in the backend
              name="password"
              value={userData.password}
              onChange={handleChange}
              className={inputStyle}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className={labelStyle} htmlFor="profession">
              Profession
            </label>
            <select
              id="profession"
              name="profession"
              value={userData.profession}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="" disabled>
                Select your profession
              </option>

              {/* Map directly here */}
              {profession.map((profa) => (
                <option key={profa} value={profa}>
                  {profa}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelStyle} htmlFor="wilaya">
              Wilaya
            </label>
            <select
              id="wilaya"
              className={inputStyle}
              name="wilaya" // Add this
              value={userData.wilaya} // Add this
              onChange={handleChange} // Add thi
            >
              <option value="" disabled selected>
                Select your wilaya
              </option>
              {wilayas.map((wilaya) => (
                <option key={wilaya} value={wilaya}>
                  {wilaya}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelStyle} htmlFor="NumTel">
              Phone Number
            </label>
            <input
              type="text"
              id="NumTel"
              name="NumTel"
              value={userData.NumTel}
              onChange={handleChange}
              className={inputStyle}
              placeholder="05XXXXXXXX"
            />
          </div>
          <div>
            <label className={labelStyle} htmlFor="adress">
              Address
            </label>
            <input
              type="text"
              id="adress"
              name="adress"
              value={userData.adress}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Enter your address"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-4"
          >
            Register
          </button>
        </form>
      </div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
          {/* THIS IS THE ONLY LOGIC YOU NEED */}
          {isRegisted ? (
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-green-600">Great!</h2>
              <p>Account created successfully.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                if you are a staff enter the Code
              </h2>
              <form className="space-y-4" onSubmit={hunbleSubmit}>
                <input
                  type="texte"
                  placeholder="enter the code"
                  className={inputStyle}
                />
              </form>
            </>
          )}
          <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/log" className="text-blue-600 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
        </div>
      </div>
      </div>

   
  );
}
