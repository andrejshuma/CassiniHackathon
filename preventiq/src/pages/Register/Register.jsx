import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [healthAdvice, setHealthAdvice] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    emailAddress: "",
    password: "",
    allergies: {
      sunAllergy: "",
      airAllergy: "",
      dustAllergy: "",
      pollenAllergy: "",
      moldAllergy: "",
      grassAllergy: "",
    },
    pollenType: "",
    diseases: {
      skinDisease: "",
      depression: "",
      asthma: "",
      copd: "",
      cardiovascularDisease: "",
    },
  });

  const steps = [
    "Account Information",
    "Allergies",
    "Medical Conditions",
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

  const handleAllergySelect = (name) => {
    setFormData((prev) => ({
      ...prev,
      allergies: {
        ...prev.allergies,
        [name]: prev.allergies[name] === "yes" ? "no" : "yes",
      },
    }));

    if (
      name === "pollenAllergy" &&
      formData.allergies.pollenAllergy === "yes"
    ) {
      setFormData((prev) => ({
        ...prev,
        pollenType: "",
      }));
    }
  };

  const handlePollenTypeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      pollenType: e.target.value,
    }));
  };

  const handleDiseaseSelect = (name) => {
    setFormData((prev) => ({
      ...prev,
      diseases: {
        ...prev.diseases,
        [name]: prev.diseases[name] === "yes" ? "no" : "yes",
      },
    }));
  };

  const allergyOptions = [
    { label: "Sun", name: "sunAllergy" },
    { label: "Air Pollution", name: "airAllergy" },
    { label: "Dust", name: "dustAllergy" },
    { label: "Pollen", name: "pollenAllergy" },
    { label: "Mold", name: "moldAllergy" },
    { label: "Grass", name: "grassAllergy" },
  ];

  const diseaseOptions = [
    { label: "Skin Disease", name: "skinDisease" },
    { label: "Depression", name: "depression" },
    { label: "Asthma", name: "asthma" },
    { label: "COPD", name: "copd" },
    { label: "Cardiovascular Disease", name: "cardiovascularDisease" },
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

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      data-theme="nord"
    >
      <div
        data-theme="nord"
        className="w-full max-w-md rounded-lg shadow-md p-6"
      >
        <h1 className="text-xl font-bold mb-6">Registration</h1>

        {/* Progress Stepper - Mobile optimized */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold text-xs
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
              <h2 className="text-lg font-semibold">Account Information</h2>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <label htmlFor="username" className="text-sm">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 mt-1 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="emailAddress" className="text-sm">
                    Email Address
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 mt-1 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 mt-1 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Allergies */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Allergies</h2>
              <div>
                <label className="block mb-2 text-sm">
                  Do you have any of the following allergies?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {allergyOptions.map((option) => (
                    <div key={option.name} className="mb-2">
                      <button
                        type="button"
                        className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
                          formData.allergies[option.name] === "yes"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                        onClick={() => handleAllergySelect(option.name)}
                      >
                        {option.label}
                      </button>
                      {option.name === "pollenAllergy" &&
                        formData.allergies.pollenAllergy === "yes" && (
                          <div className="mt-2">
                            <label className="block mb-1 text-xs">
                              Pollen type:
                            </label>
                            <select
                              value={formData.pollenType}
                              onChange={handlePollenTypeChange}
                              className="block w-full mt-1 rounded-md text-sm border border-gray-300 shadow-sm px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="">Select</option>
                              <option value="tree">Tree</option>
                              <option value="grass">Grass</option>
                              <option value="weed">Weed</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Medical Conditions */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Medical Conditions</h2>
              <div>
                <label className="block mb-2 text-sm">
                  Do you have any of these environment-affected conditions?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {diseaseOptions.map((option) => (
                    <div key={option.name}>
                      <button
                        type="button"
                        className={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                          formData.diseases[option.name] === "yes"
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                        }`}
                        onClick={() => handleDiseaseSelect(option.name)}
                      >
                        {option.label}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 - Loading and Health Advice */}
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
                    <p className="text-gray-700 mb-4">{healthAdvice}</p>
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

          {/* Navigation Buttons - Mobile optimized */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Back
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <Link
                to="/"
                className="bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600"
              >
                Complete
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiStepForm;
