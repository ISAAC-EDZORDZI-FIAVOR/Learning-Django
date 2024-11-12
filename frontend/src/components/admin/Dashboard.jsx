import { FiHome, FiSettings, FiLogOut,FiBell,FiBook,FiSidebar,FiBookOpen,FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import uewLogo from "../../assets/uew-logo.png";
import { useState,useEffect } from "react";
import UserList from "../admin/users/UserList";

const Dashboard = () => {
  const navigate = useNavigate();
  // Update state initialization to check localStorage
  const [activeComponent, setActiveComponent] = useState(
    localStorage.getItem("activeComponent") || "dashboard"
  );
  const [showProfileModal, setShowProfileModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  // Update the component selection handler
  const handleComponentChange = (component) => {
    setActiveComponent(component);
    localStorage.setItem("activeComponent", component);
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        setShowProfileModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderContent = () => {
    switch (activeComponent) {
      case "users":
        return <UserList />;
      default:
        return (
          <div className="space-y-6">
            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 py-4 px-5 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 rounded-full p-3 mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Department
                  </h3>
                  <p className="text-gray-500 font-medium">
                    {user?.department?.name || "Not Assigned"}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 rounded-full p-3 mb-4">
                    <svg
                      className="w-8 h-8 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Faculty
                  </h3>
                  <p className="text-gray-500 font-medium">
                    {user?.department?.faculty?.name || "Not Available"}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 rounded-full p-3 mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Role
                  </h3>
                  <p className="text-gray-500 font-medium">
                    {user?.is_staff ? "Admin" : "User"}
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col items-center">
                  <div className="bg-yellow-100 rounded-full p-3 mb-4">
                    <svg
                      className="w-8 h-8 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Status
                  </h3>
                  <p className="text-gray-500 font-medium">Active</p>
                </div>
              </div>
            </div>

            {/* User Details and System Info */}
            <div className="grid grid-cols-1 py-4 px-5 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  User Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-24">Name:</span>
                    <span>{user?.name}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-24">Email:</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-24">Department:</span>
                    <span className="px-4">{user?.department?.name}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-24">Last Login:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  System Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-24">Version:</span>
                    <span>1.0.0</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-24">Environment:</span>
                    <span>Production</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="font-medium w-24">Last Updated:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-45 bg-primary text-white flex flex-col p-5 space-y-4">
        <div className="flex justify-center">
          <img
            src={uewLogo}
            alt="UEW Logo"
            className="w-40 object-contain   scale-125"
          />
        </div>
        <h2 className="text-1xl font-semibold text-center mb-6">
          ACCREDITATION SYSTEM
        </h2>
        <nav className="flex flex-col space-y-2">
          <button
            onClick={() => setActiveComponent("dashboard")}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeComponent === "dashboard"
                ? "bg-blue-700"
                : "hover:bg-blue-700"
            }`}
          >
            <FiSidebar className="mr-3" /> Dashboard
          </button>
          {/* Use handleComponentChange in your click handlers */}
          <button
            onClick={() => handleComponentChange("users")}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeComponent === "users" ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            <FiUserPlus className="mr-3" />
            Add Users
          </button>
          <a
            href="#"
            className="flex items-center px-4 py-2 hover:bg-blue-700 rounded-lg"
          >
            <FiHome className="mr-3" /> Add Faculty
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 hover:bg-blue-700 rounded-lg"
          >
            <FiBook className="mr-3" /> Add Department
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 hover:bg-blue-700 rounded-lg"
          >
            <FiBookOpen className="mr-3" /> Programmes
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 hover:bg-blue-700 rounded-lg"
          >
            <FiSettings className="mr-3" /> Settings
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 hover:bg-blue-700 rounded-lg w-full text-left"
          >
            <FiLogOut className="mr-3" /> Logout
          </button>
          <p className="text-sm text-gray-300 pt-10"> {user?.email}</p>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="flex items-center justify-between bg-primary px-6 py-4 shadow">
          <h2 className="font-semibold text-white">
            Welcome,{" "}
            <span className="text-[12px] font-extrabold">{user?.name}!</span>
            <p className="text-sm text-gray-300"> {getGreeting()} </p>
          </h2>
          <div className="flex items-center space-x-4">
            {/* <input
              type="text"
              placeholder="Search..."
              className="bg-white px-4 py-2 rounded-lg focus:outline-none"
            /> */}
            <div className="flex items-center space-x-6">
              {/* Notification Icon with Badge */}
              <div className="relative">
                <FiBell className="h-8 w-8 text-white cursor-pointer bg-gray-300 rounded-full p-1" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  3
                </span>
              </div>

              {/* Profile Section with Dropdown */}
              <div className="relative profile-dropdown">
                <div
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => setShowProfileModal(!showProfileModal)}
                >
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                </div>

                {/* Profile Dropdown Modal */}
                {showProfileModal && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10">
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Activity Log
                    </a>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-1 space-y-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
