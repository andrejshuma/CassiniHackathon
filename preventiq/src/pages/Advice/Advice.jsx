import React, { useState } from "react";
import Navbar from "../GeneralComponents/Navbar";
import { Sun, Moon, Bell, Activity } from "lucide-react";
import Footer from "../GeneralComponents/Footer";
import Top from "../Home/HomepageView/Top.jsx";

const Advice = () => {
  const [currentDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  );

  // Sample data structure - this would be populated with real user data
  const healthGoals = [
    {
      id: 1,
      timeOfDay: "Morning",
      icon: <Sun className="w-5 h-5" />,
      goals: [
        {
          title: "Reduce Anxiety",
          duration: "25 Minutes",
        },
      ],
    },
    {
      id: 2,
      timeOfDay: "Day",
      icon: <Sun className="w-5 h-5" />,
      goals: [
        {
          title: "Avoid going outside",
          duration: "12pm - 16pm",
        },
      ],
    },
    {
      id: 3,
      timeOfDay: "Night",
      icon: <Moon className="w-5 h-5" />,
      goals: [
        {
          title: "Better Sleep",
          duration: "30 Minutes",
        },
      ],
    },
    {
      id: 4,
      timeOfDay: "Conditions",
      icon: <Activity className="w-5 h-5" />,
      goals: [
        {
          title: "Don't forget your medication",
          duration: "20 Minutes",
        },
      ],
    },
  ];

  return (
    <div>
      <Top />
      <div
        className="flex flex-col max-w-md mx-auto "
        data-theme="nord"
      >
        {/* Header */}
        <header className="p-4 pb-0 flex justify-between items-center">
          <div>
            {/*<h1 className="text-2xl font-bold">*/}
            {/*  Personalized Health Advice*/}
            {/*</h1>*/}
            <p className="text-base opacity-60">Today, {currentDate}</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {healthGoals.map((section) => (
            <div key={section.id} className="mb-2 ">
              {/* Time of day section */}
              <div className="flex items-center mb-2 ">
                <div className="mr-3">{section.icon}</div>
                <h2 className="text-xl font-medium">{section.timeOfDay}</h2>
              </div>

              {/* Goals for this time period */}
              <div className="ml-10 border-l-2 border-dashed pl-6 pb-6">
                {section.goals.map((goal, idx) => (
                  <div
                    key={idx}
                    className="bg-blue-400 rounded-lg  p-4 mb-4 flex items-center shadow-md justify-between"
                  >
                    <div >
                      <h3 className="text-base font-medium text-white">{goal.title}</h3>
                      <p className="text-base text-white">{goal.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Advice;
