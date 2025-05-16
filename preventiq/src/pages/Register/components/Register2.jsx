import React, { useState } from "react";
import { Link } from "react-router-dom";

const allergyOptions = [
  { label: "Sun", name: "sunAllergy" },
  { label: "Air Pollution", name: "airAllergy" },
  { label: "Dust", name: "dustAllergy" },
  { label: "Pollen", name: "pollenAllergy" },
  { label: "Mold", name: "moldAllergy" },
  { label: "Grass", name: "grassAllergy" },
];

const Register2 = () => {
  const [allergies, setAllergies] = useState({
    sunAllergy: "",
    airAllergy: "",
    dustAllergy: "",
    pollenAllergy: "",
    moldAllergy: "",
    grassAllergy: "",
  });
  const [pollenType, setPollenType] = useState("");

  const handleSelect = (name) => {
    setAllergies((prev) => ({
      ...prev,
      [name]: prev[name] === "yes" ? "no" : "yes",
    }));
    if (name === "pollenAllergy" && allergies.pollenAllergy === "yes") {
      setPollenType("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mb-4">
          Account settings
        </h2>

        <form className="mb-4">
          <div className="grid grid-cols-1 gap-6 mt-4">
            <div>
              <label className="text-gray-700 dark:text-gray-200 block mb-2">
                Do you have any of the following allergies?
              </label>
              <div className="flex flex-col gap-4">
                {allergyOptions.map((option) => (
                  <div key={option.name}>
                    <button
                      type="button"
                      className={`mr-2 px-4 py-2 rounded font-semibold transition-colors ${
                        allergies[option.name] === "yes"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => handleSelect(option.name)}
                    >
                      {option.label}
                    </button>
                    {option.name === "pollenAllergy" &&
                      allergies.pollenAllergy === "yes" && (
                        <div className="ml-6 mt-2">
                          <label className="text-gray-700 dark:text-gray-200 block mb-2">
                            Which type of pollen allergy do you have?
                          </label>
                          <select
                            name="pollenType"
                            value={pollenType}
                            onChange={(e) => setPollenType(e.target.value)}
                            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          >
                            <option value="">Select type</option>
                            <option value="tree">Tree pollen</option>
                            <option value="grass">Grass pollen</option>
                            <option value="weed">Weed pollen</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Link
              to="/register3"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Next
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Register2;
