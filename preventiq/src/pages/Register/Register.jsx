import { useState } from "react";
import { useGlobalState } from "../../GlobalStateProvider.jsx";
import {Link} from "react-router-dom"; // Adjust the import path as necessary

function MultiStepForm() {
  const { globalObject, setGlobalObject } = useGlobalState();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [healthAdvice, setHealthAdvice] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    emailAddress: "",
    password: "",
    gender: "",
    age: "",
    healthConditions: {
      asthma: "",
      respiratoryProblems: "",
      cardiovascularProblems: "",
      pollenAllergy: "",
      mentalHealthDisorder: "",
      skinConditions: "",
    },
  });

  const steps = [
    "Account Information",
    "Personal Details",
    "Health Conditions",
    "Health Advice",
  ];

  // Array of random health advice tips
  const healthAdviceTips = [
    "Stay hydrated! Aim for at least 8 glasses of water per day.",
    "Regular exercise can help reduce symptoms of environmental allergies.",
    "Using air purifiers at home can significantly reduce indoor allergens.",
    "If you have pollen allergies, try to limit outdoor activities during high pollen count days.",
    "People with asthma should avoid exercising outdoors during high pollution days.",
    "Washing your bedding weekly in hot water can help reduce dust mite allergies.",
    "Consider wearing a mask when pollution levels are high if you have respiratory conditions.",
    "Maintain a consistent sleep schedule for better overall health.",
    "Stress management techniques can help reduce allergy symptoms.",
    "Keep windows closed during high pollen seasons to minimize exposure.",
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 2) {
        // When moving to the health advice step, show loading first
        setLoading(true);
        setTimeout(() => {
          // Select random health advice
          const randomIndex = Math.floor(
              Math.random() * healthAdviceTips.length
          );
          setHealthAdvice(healthAdviceTips[randomIndex]);
          setLoading(false);
        }, 2000); // Show loading for 2 seconds
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleConditionSelect = (name) => {
    setFormData((prev) => ({
      ...prev,
      healthConditions: {
        ...prev.healthConditions,
        [name]: prev.healthConditions[name] === "yes" ? "no" : "yes",
      },
    }));
  };

  const healthConditionOptions = [
    { label: "Asthma", name: "asthma" },
    { label: "Respiratory Problems", name: "respiratoryProblems" },
    { label: "Cardiovascular Problems", name: "cardiovascularProblems" },
    { label: "Pollen Allergy", name: "pollenAllergy" },
    { label: "Mental Health Disorder", name: "mentalHealthDisorder" },
    { label: "Skin Conditions", name: "skinConditions" },
  ];

  // Load new health advice when user refreshes this step
  const refreshAdvice = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * healthAdviceTips.length);
      setHealthAdvice(healthAdviceTips[randomIndex]);
      setLoading(false);
    }, 1500);
  };


  const sendLocation = () => {
    return new Promise((resolve, reject) => {
      setLoading(true);

      const success = (position) => {
        const url = "http://localhost:8000/api/data/";
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((result) => {
              setLoading(false);
              resolve(result.data);
            })
            .catch((error) => {
              setLoading(false);
              console.error("Error:", error);
              reject(error);
            });
      };

      const error = () => {
        setLoading(false);
        alert("niso ne praime bez lokacija bratce");
        reject("Location denied");
      };

      navigator.geolocation.getCurrentPosition(success, error);
    });
  };


  const submitForm = async (age, diseases, data) => {
    const payload = {
      age: age,
      diseases: Object.keys(diseases).filter(key => diseases[key] === "yes")[0],
      scores: data.data,
    };

    try {
      const response = await fetch("http://localhost:8000/api/calculate/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.log('ERRRRORRRRR')
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      return Math.round(result.score * 1000)/10;
    } catch (error) {
      console.error("Error submitting form:", error);
      return null;
    }
  };



  return (
      <div
          className="flex items-center justify-center min-h-screen p-2 sm:p-4 bg-blue-100"
          data-theme="nord"
      >
        <div
            data-theme="nord"
            className="w-full max-w-md rounded-lg shadow-md p-4 sm:p-6 font-bold text-lg"
        >
          <h1 className="text-xl mb-6">Registration</h1>

          {/* Progress Stepper - Mobile optimized */}
          <div className="mb-4 sm:mb-6">
            <div className="flex justify-between items-center mb-2">
              {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                        className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 font-bold text-xs
                    ${
                            currentStep === index
                                ? "border-blue-500 text-blue-500"
                                : currentStep > index
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "border-gray-300 text-gray-500"
                        }`}
                    >
                      {currentStep > index ? "✓" : index + 1}
                    </div>
                    <span className="text-xs mt-1 hidden sm:inline">{step}</span>
                  </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                    style={{
                      width: `${(currentStep / (steps.length - 1)) * 100}%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap justify-center bg-blue-500 transition-all duration-300"
                ></div>
              </div>
            </div>
          </div>

          {/* Form Steps */}
          <div>
            {/* Step 1 - Account Information */}
            {currentStep === 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold">Account Information</h2>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <div>
                      <label htmlFor="username" className="text-lg font-semibold font-semibold">
                        Username
                      </label>
                      <input
                          id="username"
                          type="text"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-1 text-lg font-semibold border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="emailAddress" className="text-lg font-semibold">
                        Email Address
                      </label>
                      <input
                          id="emailAddress"
                          type="email"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-1 text-lg font-semibold border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="text-lg font-semibold">
                        Password
                      </label>
                      <input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-1 text-lg font-semibold border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
            )}

            {/* Step 2 - Personal Details (Gender and Age) */}
            {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold">Personal Details</h2>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <div>
                      <label htmlFor="gender" className="text-lg font-semibold">
                        Gender
                      </label>
                      <select
                          id="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-1 text-lg font-semibold border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="age" className="text-lg font-semibold">
                        Age
                      </label>
                      <input
                          id="age"
                          type="number"
                          min="0"
                          max="120"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="block w-full px-4 py-2 mt-1 text-lg font-semibold border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
            )}

            {/* Step 3 - Combined Health Conditions */}
            {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold">Health Conditions</h2>
                  <div>
                    <label className="block mb-2 text-lg font-semibold">
                      Do you have any of these health conditions?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {healthConditionOptions.map((option) => (
                          <div key={option.name} className="mb-2">
                            <button
                                type="button"
                                className={`w-full h-14 px-3 py-2 rounded-md border-2 font-semibold transition text-base
                          ${
                                    formData.healthConditions[option.name] === "yes"
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "border-gray-300 bg-white text-gray-700 hover:bg-blue-100"
                                }`}
                                onClick={() => handleConditionSelect(option.name)}
                            >
                              {option.label}
                            </button>
                          </div>
                      ))}
                    </div>
                  </div>
                </div>
            )}

            {/* Step 4 - Health Advice */}
            {currentStep === 3 && (
                <div className="space-y-4 flex flex-col items-center justify-center min-h-40">
                  {loading ? (
                      <div className="text-center py-8">
                        <div className="inline-block w-12 h-12 border-4 border-t-blue-500 border-b-blue-300 border-l-blue-300 border-r-blue-300 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">
                          Analyzing your health profile...
                        </p>
                      </div>
                  ) : (
                      <div className="text-center py-4">
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <h3 className="text-lg font-semibold mb-2 text-blue-700">
                            Your Personalized Health Tip
                          </h3>
                          <p className="text-gray-700 font-semibold mb-4">{healthAdvice}</p>
                          <button
                              onClick={refreshAdvice}
                              className="text-blue-600 text-sm flex items-center justify-center mx-auto"
                          >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              />
                            </svg>
                            Get another tip
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          These tips are customized based on your health profile.
                        </p>
                      </div>
                  )}
                </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-md font-bold transition
            ${
                    currentStep === 0
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Previous
            </button>

            {currentStep === steps.length - 1 ? (
                <Link
                    to="/"
                    onClick={async () => {
                      try {
                        const data = await sendLocation();
                        const score = await submitForm(formData.age, formData.healthConditions, data);

                        setGlobalObject(() => ({
                          data: data,
                          score: score,
                          user: formData,
                        }));
                      } catch (error) {
                        console.error("Error during registration:", error);
                      }
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md font-bold hover:bg-green-700 transition"
                >
                  Complete Registration
                </Link>
            ) : (
                <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition"
                >
                  Next
                </button>
            )}
          </div>
        </div>
      </div>
  );
}

export default MultiStepForm;
