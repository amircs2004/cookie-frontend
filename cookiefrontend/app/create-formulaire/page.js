"use client";

import { useState } from "react";
import { apiCreateFormulaire } from "../../lib/api";
import { useRouter } from "next/navigation";
export default function UpdateProfilePage() {
   const router = useRouter ()
    const cars = [
    "renault",
    "dacia",
    "peugeot",
    "toyota",
    "hyundai",
    "kia",
    "volkswagen",
    "skoda",
    "seat",
    "nissan",
    "citroen",
    "mercedes",
    "suzuki",
    "fiat",
  ];
  const Energy = ["Diesel", "Essence", "Hybride", "Électrique"];
  const model = [
    "mercedes classe a",
    "mercedes classe b",
    "mercedes cla",
    "mercedes gla",
    "mercedes cla shooting brake",
    "mercedes classe c",
    "mercedes classe e",
    "mercedes classe v",
    "mercedes gle",
  ];
  const puissanceFiscale = [
    "4cv",
    "5cv",
    "6cv",
    "7cv",
    "8cv",
    "9cv",
    "10cv",
    "11cv",
    "12cv",
    "13cv",
    "14cv",
    "15cv",
    "16cv",
  ];
  const numbrePlace = [2, 3, 4, 5, 6, 7];
  const moteurs = ["200 d Exclusif +++", "200 d Exclusif"];
  const [newVersion, setNewVersion] = useState({
    moteur: "",
    annee: "",
    energie: "",
  });
  const inputStyle =
    "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-black placeholder:text-black";
  const [formulaire, setFormulaire] = useState({
    carType: "",
    model: "",
    version: [],
    puissanceFiscale: "",
    numbrePlace: "",
    numéroDimmatriculation: "",
    valeurVénale: "",
    driver: "",
  });

  const handleAddVersion = () => {
    if (newVersion.moteur && newVersion.annee && newVersion.energie) {
      setFormulaire((prev) => ({
        ...prev,
        version: [...prev.version, newVersion],
      }));
      setNewVersion({ moteur: "", annee: "", energie: "" });
    }
  };

  const createformulaire = async () => {
    try {
      const result = await apiCreateFormulaire(formulaire);
      console.log("Form saved successfully!", result);
      if (result) {
         router.push(`/client/${result.data._id}`)
      }else {
        alert('error at saving the formulaire')
      }
    } catch (error) {
      console.error("Error at saving formulaire:", error);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl my-10 border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Create Car Formula
      </h1>

      {/* Basic Car Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          className={inputStyle}
          onChange={(e) =>
            setFormulaire({ ...formulaire, carType: e.target.value })
          }
        >
          <option value="">Select Car Type</option>
          {cars.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className={inputStyle}
          onChange={(e) =>
            setFormulaire({ ...formulaire, model: e.target.value })
          }
        >
          <option value="">Select Model</option>
          {model.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          className={inputStyle}
          onChange={(e) =>
            setFormulaire({ ...formulaire, puissanceFiscale: e.target.value })
          }
        >
          <option value="">Select Puissance Fiscale</option>
          {puissanceFiscale.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <select
          className={inputStyle}
          onChange={(e) =>
            setFormulaire({ ...formulaire, numbrePlace: e.target.value })
          }
        >
          <option value="">Select Number of Seats</option>
          {numbrePlace.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <input
          className={inputStyle}
          placeholder="Numéro Immatriculation"
          type="number"
          onChange={(e) =>
            setFormulaire({
              ...formulaire,
              numéroDimmatriculation: e.target.value,
            })
          }
        />
        <input
          className={inputStyle}
          placeholder="Valeur Vénale"
          type="number"
          onChange={(e) =>
            setFormulaire({ ...formulaire, valeurVénale: e.target.value })
          }
        />
      </div>

      {/* Version Input Section - Kept bg-gray-50 for visual separation */}
      <div className="mt-8 p-6 bg-white border border-gray-200 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Add Version
        </h3>
        <div className="flex flex-col gap-3">
          <select
            className={inputStyle}
            value={newVersion.moteur}
            onChange={(e) =>
              setNewVersion({ ...newVersion, moteur: e.target.value })
            }
          >
            <option value="">Select Moteur</option>
            {moteurs.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              className={inputStyle}
              placeholder="Year"
              type="number"
              value={newVersion.annee}
              onChange={(e) =>
                setNewVersion({ ...newVersion, annee: e.target.value })
              }
            />
            <select
              className={inputStyle}
              value={newVersion.energie}
              onChange={(e) =>
                setNewVersion({ ...newVersion, energie: e.target.value })
              }
            >
              <option value="" disabled>
                Select Energy
              </option>
              {Energy.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddVersion}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add Version +
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {formulaire.version.map((v, i) => (
            <li
              key={i}
              className="bg-gray-50 p-3 rounded-lg border border-gray-100 shadow-sm text-sm"
            >
              <span className="font-bold text-gray-800">{v.moteur}</span> —{" "}
              {v.annee} — <span className="text-blue-600">{v.energie}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={createformulaire}
        className="w-full mt-8 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition shadow-lg"
      >
        Save Entire Form
      </button>
    </div>
  );
}
