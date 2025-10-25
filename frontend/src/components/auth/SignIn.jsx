// // src/components/auth/SignIn.jsx
// import { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import React from "react";
// import { IoMdEyeOff } from "react-icons/io";
// import { FaEye } from "react-icons/fa";
// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setshowPassword] = useState(false);
//   const { signin } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const result = await signin(email, password);

//     if (result.success) {
//       navigate("/dashboard");
//     } else {
//       setError(result.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center  from-blue-50 to-indigo-100 px-4">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
//           <p className="text-gray-600 mt-2">Sign in to your account</p>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-4 py-2 bg-blue-50 border border-gray-300 rounded-lg  outline-none"
//               placeholder="you@example.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <div className=" bg-blue-50    border  border-gray-300 rounded-lg flex items-center ">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2  rounded-lg  focus:border-transparent outline-none"
//               placeholder="••••••••"
//             />
//             <div
//               onClick={() => setshowPassword((prev) => !prev)}
//               className="cursor-pointer pr-2"
//             >
//               {showPassword ? <FaEye size={16} /> : <IoMdEyeOff size={16} />}
//             </div>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium cursor-pointer"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-600">
//           Don't have an account?{" "}
//           <Link
//             to="/signup"
//             className="text-green-700 hover:text-green-800 font-semibold"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }




// src/components/auth/SignIn.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import React from "react";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signin(email, password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition duration-200 cursor-pointer "
        >
          <IoArrowBack size={20} />
          <span className="font-medium">Back</span>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-blue-50 border border-gray-300 rounded-lg outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="bg-blue-50 border border-gray-300 rounded-lg flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg focus:border-transparent outline-none"
                placeholder="••••••••"
              />
              <div
                onClick={() => setshowPassword((prev) => !prev)}
                className="cursor-pointer pr-2"
              >
                {showPassword ? <FaEye size={16} /> : <IoMdEyeOff size={16} />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-700 hover:text-green-800 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}