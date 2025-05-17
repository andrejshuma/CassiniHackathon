import React, { useState } from "react";
import Navbar from "../GeneralComponents/Navbar";
import Footer from "../GeneralComponents/Footer";

const Profile = () => {
  // Sample user data (not functional, just for structure)
  const [userData, setUserData] = useState({
    username: "johndoe",
    email: "john.doe@example.com",
    fullName: "John Doe",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Frontend developer with passion for UI/UX design",
  });

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Profile Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-lg">
              Manage your account information and settings
            </p>
          </div>

          {/* Profile Avatar Section */}
          <div className="mb-8 flex items-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mr-6 flex items-center justify-center overflow-hidden">
              {/* Avatar placeholder */}
              <span className="text-3xl">JD</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {userData.username}
              </h2>
              <button className="btn btn-primary py-2 px-4 border rounded-md mr-3">
                Change Avatar
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <form className="space-y-6">
            {/* Personal Information Section */}
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">Username</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md"
                    value={userData.username}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border rounded-md"
                    value={userData.email}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md"
                    value={userData.fullName}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full p-3 border rounded-md"
                    value={userData.phone}
                    readOnly
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Location</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md"
                    value={userData.location}
                    readOnly
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block mb-2 font-medium">Bio</label>
                <textarea
                  className="w-full p-3 border rounded-md h-24"
                  value={userData.bio}
                  readOnly
                ></textarea>
              </div>
            </div>
            {/* Health Information Section */}
            <div className="p-6 border rounded-lg shadow-sm my-6">
              <h3 className="text-xl font-semibold mb-4">Health Information</h3>

              {/* Diseases Section */}
              <div className="mb-6">
                <label className="block mb-2 font-medium">Diseases</label>
                <div className="space-y-2">
                  {userData.diseases &&
                    userData.diseases.map((disease, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          className="w-full p-3 border rounded-md"
                          value={disease}
                          readOnly
                        />
                        <button
                          type="button"
                          className="btn btn-primary ml-2 p-2 text-red-500"
                          onClick={() => {
                            const newDiseases = [...userData.diseases];
                            newDiseases.splice(index, 1);
                            setUserData({ ...userData, diseases: newDiseases });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    className=" btn btn-primary mt-2 py-2 px-4 border rounded-md"
                    onClick={() => {
                      const diseases = userData.diseases || [];
                      setUserData({ ...userData, diseases: [...diseases, ""] });
                    }}
                  >
                    Add Disease
                  </button>
                </div>
              </div>

              {/* Allergies Section */}
              <div>
                <label className="block mb-2 font-medium">Allergies</label>
                <div className="space-y-2">
                  {userData.allergies &&
                    userData.allergies.map((allergy, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          className="w-full p-3 border rounded-md"
                          value={allergy}
                          readOnly
                        />
                        <button
                          type="button"
                          className="ml-2 p-2 text-red-500"
                          onClick={() => {
                            const newAllergies = [...userData.allergies];
                            newAllergies.splice(index, 1);
                            setUserData({
                              ...userData,
                              allergies: newAllergies,
                            });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    className=" btn btn-primary mt-2 py-2 px-4 border rounded-md"
                    onClick={() => {
                      const allergies = userData.allergies || [];
                      setUserData({
                        ...userData,
                        allergies: [...allergies, ""],
                      });
                    }}
                  >
                    Add Allergy
                  </button>
                </div>
              </div>
            </div>

            {/* Account Settings Section */}
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Account Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border rounded-md"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">New Password</label>
                  <input
                    type="password"
                    className="w-full p-3 border rounded-md"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border rounded-md"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                Notification Preferences
              </h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotif"
                    className="mr-3 h-4 w-4"
                    defaultChecked
                  />
                  <label htmlFor="emailNotif">Email notifications</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pushNotif"
                    className="mr-3 h-4 w-4"
                    defaultChecked
                  />
                  <label htmlFor="pushNotif">Push notifications</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="marketingNotif"
                    className="mr-3 h-4 w-4"
                  />
                  <label htmlFor="marketingNotif">Marketing emails</label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn btn-secondary py-2 px-6 border rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary py-2 px-6 border rounded-md font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
