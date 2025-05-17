import React from "react";
import logo from "../../assets/logoSmall.png"; // Adjust the path as necessary
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-2 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <a href="#">
            <img className="w-30 rounded-lg " src={logo} alt="Logo" />
          </a>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="px-3 py-1 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Home
            </a>
            <a
              href="/profile"
              className="px-3 py-1 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Profile
            </a>
            <a
              href="/advice"
              className="px-3 py-1 text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Advice
            </a>

          </div>
        </div>

        <div className="flex flex-col items-center mt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            © Copyright 2025. All Rights Reserved.
          </p>

          <div className="flex mt-4 sm:mt-0">
            {/* Social icons */}
            {[
              { name: "Reddit", svgPath: "..." }, // Use your current SVG paths
              { name: "Facebook", svgPath: "..." },
              { name: "Github", svgPath: "..." },
            ].map((icon, idx) => (
              <a
                key={idx}
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                aria-label={icon.name}
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  dangerouslySetInnerHTML={{ __html: icon.svgPath }}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
