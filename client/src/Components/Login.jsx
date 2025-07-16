// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom'; // For redirecting to the signup page
// // import Navbar from './Navbar';

// // const Login = () => {
// //   // State for email and password input fields
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault(); // Prevent page reload on form submit

// //     // Basic frontend validation
// //     if (!email || !password) {
// //       setError('Please fill in all fields.');
// //       return;
// //     }

// //     setError('');

// //     try {
// //       // Sending a POST request to your backend (Node.js + Express)
// //       const response = await fetch('http://localhost:3000/api/login', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ email, password }),
// //       });

// //       const data = await response.json();

// //       if (data.success) {
// //         // Store the JWT token in localStorage
// //         if (data.token) {
// //           localStorage.setItem('token', data.token);
// //           console.log('Login successful. Token stored in localStorage:', data.token);

// //           // Redirect to home or dashboard
// //           navigate('/');
// //         } else {
// //           setError('No token received from server.');
// //         }
// //       } else {
// //         setError(data.message || 'Invalid credentials');
// //       }
// //     } catch (err) {
// //       console.error('Error:', err);
// //       setError('Something went wrong. Please try again.');
// //     }
// //   };


// //   return (
// //     <div>

// //     <Navbar />
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
// //       <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
// //         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

// //         {/* Error message display */}
// //         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

// //         {/* Login form */}
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block mb-1 text-sm font-medium text-gray-700">Email ID</label>
// //             <input
// //               type="email"
// //               className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
// //             <input
// //               type="password"
// //               className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
// //           >
// //             Login
// //           </button>
// //         </form>

// //         {/* Navigation to signup */}
// //         <p className="mt-6 text-center text-sm text-gray-600">
// //           Don't have an account?{' '}
// //           <span
// //             onClick={() => navigate('/signup')}
// //             className="text-blue-600 hover:underline cursor-pointer font-medium"
// //           >
// //             Create Account
// //           </span>
// //         </p>
// //       </div>
// //     </div>
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import { IoArrowBack } from 'react-icons/io5';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     setError('');
//     try {
//       const response = await fetch('http://localhost:3000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         if (data.token) {
//           localStorage.setItem('token', data.token);
//           navigate('/');
//         } else {
//           setError('No token received from server.');
//         }
//       } else {
//         setError(data.message || 'Invalid credentials');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <Navbar />

//       {/* Login Container */}
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
//         {/* Back button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="absolute top-20 left-4 z-50 text-gray-600 hover:text-blue-600 transition duration-200"
//           title="Go back"
//         >
//           <IoArrowBack size={24} />
//         </button>
//         <div className="bg-white/80 backdrop-blur-md shadow-2xl p-10 rounded-3xl w-full max-w-md border border-gray-200 transition-all duration-300">
//           <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Welcome Back 👋</h2>

//           {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//                 placeholder="example@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
//                 placeholder="password..."
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200 shadow-md"
//             >
//               Login
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <span
//               onClick={() => navigate('/signup')}
//               className="text-indigo-600 hover:underline cursor-pointer font-medium"
//             >
//               Create Account
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import { IoArrowBack } from 'react-icons/io5';
// import { FiEye, FiEyeOff } from 'react-icons/fi';

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     setError('');

//     try {
//       const response = await fetch('http://localhost:3000/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (data.token) {
//           localStorage.setItem('token', data.token);
//           navigate('/');
//         } else {
//           setError('No token received from server.');
//         }
//       } else {
//         setError(data.message || 'Invalid credentials');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setError('Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="relative">
//       {/* Navbar */}
//       <Navbar />

//       {/* Back Button */}
//       <div className="absolute top-4 left-4 z-10 sm:top-6 sm:left-8 md:left-12">
//         <button
//           onClick={() => navigate(-1)}
//           className="text-gray-700 hover:text-blue-600 transition duration-200 p-1"
//           title="Go back"
//         >
//           <IoArrowBack size={24} />
//         </button>
//       </div>

//       {/* Main Login Container */}
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4 pt-20 sm:pt-24">
//         <div className="bg-white/90 backdrop-blur-md shadow-2xl p-10 rounded-3xl w-full max-w-md border border-gray-200 transition-all duration-300">
//           <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Welcome Back 👋</h2>

//           {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">Email Address</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="example@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   className="w-full px-4 py-2 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
//                   title={showPassword ? 'Hide Password' : 'Show Password'}
//                 >
//                   {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
//                 </span>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition duration-200 shadow-md"
//             >
//               Login
//             </button>
//           </form>

//           <p className="mt-6 text-center text-sm text-gray-600">
//             Don't have an account?{' '}
//             <span
//               onClick={() => navigate('/signup')}
//               className="text-indigo-600 hover:underline cursor-pointer font-medium"
//             >
//               Create Account
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { IoArrowBack } from 'react-icons/io5';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="relative bg-color min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="absolute z-10 top-20 left-4 sm:top-24 sm:left-6 md:left-10">
        <button
          onClick={() => navigate(-1)}
          className="text-orange-900 hover:text-orange-950 transition duration-200 p-1 cursor-pointer"
          title="Go back"
        >
          <IoArrowBack size={24} />
        </button>
      </div>

      {/* Login Form Section */}
      <div className="pt-40 px-4 flex items-center justify-center">
        <div className="bg-orange-100 backdrop-blur-md shadow-2xl p-10 rounded-sm w-full max-w-md border border-orange-200 transition-all duration-300">
          <h2 className="text-3xl font-bold text-center text-orange-900 mb-6 oxygen-bold ">Welcome Back 👋</h2>

          {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-orange-900 oxygen-regular">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-900 oxygen-regular"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-orange-900 oxygen-regular">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full px-4 py-2 pr-10 rounded-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-900 oxygen-regular"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  title={showPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-stone-900/80 hover:bg-stone-900 text-white font-semibold rounded-sm transition duration-200 shadow-md oxygen-regular cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-orange-900 oxygen-regular">
            Don&apos;t have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-orange-900 hover:underline cursor-pointer font-medium oxygen-bold"
            >
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
