import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const DropdownMenu = ({ openModal }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showNestedMenu, setShowNestedMenu] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const settingsRef = useRef(null);

  const linkClasses =
    "cursor-pointer px-4 py-2 hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm md:text-base";
  const nestedClasses =
    "cursor-pointer flex gap-2 justify-between items-center px-4 py-2 hover:bg-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm md:text-base";

  const closeDropdown = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setShowMenu(false);
      setShowNestedMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="flex items-center justify-end md:justify-center p-4 md:p-8">
      <div className="relative w-full max-w-xs md:max-w-sm">
        <div ref={settingsRef} className="relative">
          <div
            onClick={() => {
              setShowMenu(!showMenu);
              setShowNestedMenu(false);
            }}
            className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white dark:border-slate-600 dark:bg-gray-800 px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <img
                src="https://i.imgur.com/ZgBah7z.jpeg"
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover"
              />
              <h2 className="truncate">{userInfo?.username}</h2>
            </div>
            {!showMenu ? (
              <ChevronDownIcon className="h-5 w-5" />
            ) : (
              <ChevronUpIcon className="h-5 w-5" />
            )}
          </div>
          {showMenu && (
            <div className="absolute bottom-16 mt-2 w-60 rounded-lg border border-gray-300 bg-white shadow-lg dark:border-slate-600 dark:bg-slate-900">
              <div className="flex flex-col divide-y divide-gray-300 dark:divide-slate-600">
                <div className="py-2">
                  <a href="#" className={linkClasses}>
                    Edit Profile
                  </a>
                </div>
                <div className="py-2 flex flex-col">
                  <div
                    className="relative"
                    onClick={() => setShowNestedMenu(!showNestedMenu)}
                  >
                    <div className={nestedClasses}>
                      <p>Account</p>
                      <ChevronRightIcon className="h-5 w-5" />
                    </div>
                    {showNestedMenu && (
                      <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-900">
                        <a href="#" className={linkClasses}>
                          Change Email
                        </a>
                        <a href="#" className={linkClasses}>
                          Change Password
                        </a>
                        <a href="#" className={linkClasses}>
                          Backup Data
                        </a>
                      </div>
                    )}
                  </div>
                  <a href="#" className={linkClasses}>
                    Privacy
                  </a>
                  <a href="#" className={linkClasses}>
                    Security
                  </a>
                </div>
                <div className="py-2 flex flex-col">
                  <a href="#" className={linkClasses}>
                    Help
                  </a>
                  <a href="#" className={linkClasses}>
                    About
                  </a>
                  <a href="#" className={linkClasses} onClick={openModal}>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
