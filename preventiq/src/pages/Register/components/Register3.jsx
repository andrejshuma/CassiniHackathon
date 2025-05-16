import React, { useState } from "react";
import { Link } from "react-router-dom";

const diseaseOptions = [
  { label: "Skin Disease", name: "skinDisease" },
  { label: "Depression", name: "depression" },
  { label: "Asthma", name: "asthma" },
  { label: "COPD", name: "copd" },
  { label: "Cardiovascular Disease", name: "cardiovascularDisease" },
];

const Register3 = () => {
  const [diseases, setDiseases] = useState({
    skinDisease: "",
    depression: "",
    asthma: "",
    copd: "",
    cardiovascularDisease: "",
  });

  const handleSelect = (name) => {
    setDiseases((prev) => ({
      ...prev,
      [name]: prev[name] === "yes" ? "no" : "yes",
    }));
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
                Do you have any of the following diseases affected by the
                environment?
              </label>
              <div className="flex flex-col gap-4">
                {diseaseOptions.map((option) => (
                  <div key={option.name}>
                    <button
                      type="button"
                      className={`mr-2 px-4 py-2 rounded font-semibold transition-colors ${
                        diseases[option.name] === "yes"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => handleSelect(option.name)}
                    >
                      {option.label}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Link
              to="/"
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

export default Register3;
