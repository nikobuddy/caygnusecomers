import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      setError("Failed to send password reset email. Please check your email.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50">
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Forgot Password
          </h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            {message && (
              <div className="text-green-500 text-center mb-4">{message}</div>
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
            <div className="mt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Reset Link
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
