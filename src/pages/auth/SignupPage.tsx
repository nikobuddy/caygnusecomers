import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        phone,
        email,
        password, // It’s generally not recommended to store plaintext passwords
      });

      // Redirect to login page or another route
      navigate("/login");
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50">
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
              Create an Account
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="text-red-500 text-center mb-4">{error}</div>
              )}
              <div className="relative mt-6">
                <FaUser className="absolute left-4 top-3 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="peer appearance-none block w-full pl-12 pr-4 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder=" "
                />
                <label
                  htmlFor="username"
                  className="absolute left-12 top-0 text-gray-500 text-sm transform -translate-y-1/2 origin-left transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-4 peer-focus:text-xs"
                >
                  Name
                </label>
              </div>
              <div className="relative mt-6">
                <FaPhone className="absolute left-4 top-3 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="peer appearance-none block w-full pl-12 pr-4 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder=" "
                />
                <label
                  htmlFor="phone"
                  className="absolute left-12 top-0 text-gray-500 text-sm transform -translate-y-1/2 origin-left transition-transform duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:-translate-y-1/2 peer-focus:-translate-y-4 peer-focus:text-xs"
                >
                  Phone number
                </label>
              </div>
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

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          © 2024 Caygnus. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SignUpPage;
