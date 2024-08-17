import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Dashboard"); // Redirect to the home page
    } catch (err) {
      console.error("Login Error:", err); // Log the exact error
      setError("Failed to sign in. Please check your email and password.");
    } finally {
      setLoading(false); // Set loading to false after the attempt is complete
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50">
      {/* Header */}

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-6 bg-white shadow-lg rounded-lg relative">
          <div className="absolute inset-0 opacity-20 bg-[url('/path-to-background-image.jpg')] bg-cover rounded-lg"></div>
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
              <img
                src="/src/assets/logs.png"
                alt="Caygnus Logo"
                className="h-20 w-20 animate-bounce"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Welcome Back!
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-500 text-center mb-4">{error}</div>
              )}
              <div className="relative mt-6">
                <FaEnvelope className="absolute left-4 top-3 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer appearance-none block w-full pl-12 pr-4 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-12 top-0 text-gray-500 text-sm transform -translate-y-1/2 origin-left transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-4 peer-focus:text-xs"
                >
                  Email address
                </label>
              </div>
              <div className="relative mt-6">
                <FaLock className="absolute left-4 top-3 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer appearance-none block w-full pl-12 pr-4 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute left-12 top-0 text-gray-500 text-sm transform -translate-y-1/2 origin-left transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-4 peer-focus:text-xs"
                >
                  Password
                </label>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="/forgot-password"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? "Signing in..." : "Sign in"}{" "}
                  {/* Button text based on loading state */}
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          © 2024 Caygnus. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
