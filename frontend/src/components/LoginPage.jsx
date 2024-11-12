import { useState, useEffect } from "react";
import uewLogo from "../assets/logo.png";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email) {
      toast.error("Please enter your email address", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
      setLoading(false);
      return;
    }
    if (!password) {
      toast.error("Please enter your password", {
        position: "top-right",
        autoClose: 1000,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post("api/auth/login/", {
        email,
        password,
      });

      if (data.status === "error") {
        toast.error(data.message);
        return;
      }

      localStorage.setItem("token", data.data.access);
      localStorage.setItem("refresh_token", data.data.refresh);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      toast.success(data.message);
      navigate("/dashboard");
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary to-secondary p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex space-x-20 animate-slide">
            {[...Array(3)].map((_, index) => (
              <img
                key={index}
                src={uewLogo}
                alt=""
                className="opacity-10 w-45"
              />
            ))}
          </div>
        </div>
      </div>

      <ToastContainer />
      <div className="max-w-sm w-full bg-blue-700 bg-opacity-10 rounded-lg p-8 shadow-lg text-center text-white backdrop-blur-sm z-10">
        <div className="flex justify-center mb-4">
          <img src={uewLogo} alt="University Logo" className="h-35 w-40" />
        </div>

        <h1 className="text-2xl font-bold mb-2">UEW ACCREDITATION</h1>
        <p className="text-gray-200 mb-6 text-sm">
          All our products in one place
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center border border-gray-300 py-3 bg-gray-900 bg-opacity-20 rounded-md hover:border-white transition-colors duration-300">
            <FiMail className="text-white ml-4" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent w-full text-white placeholder-white focus:outline-none px-3 rounded-full"
              disabled={loading}
            />
          </div>

          <div className="flex items-center border border-white py-3 bg-gray-900 bg-opacity-20 rounded-md hover:border-white transition-colors duration-300">
            <FiLock className="text-white ml-4" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent w-full text-white placeholder-white focus:outline-none px-3 rounded-full"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-white mr-3 focus:outline-none"
              disabled={loading}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 bg-white text-blue-800 font-semibold rounded-full transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-sm">
          <a href="#" className="text-gray-200 hover:underline">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
