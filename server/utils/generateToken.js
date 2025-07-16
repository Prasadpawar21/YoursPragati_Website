// const jwt = require("jsonwebtoken");

// const generateToken = (user) => {
//   return jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//       firstName: user.firstName,
//       role: user.role, // Make sure your schema includes 'role'
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "1d", // Token valid for 1 day
//     }
//   );
// };

// module.exports = generateToken;

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName, // ✅ Include last name
      role: user.role,
      isTemporaryAdmin: user.isTemporaryAdmin, // ✅ Include temporary admin status
      adminAccessExpiresAt: user.adminAccessExpiresAt, // ✅ Include expiration if any
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d", // Token valid for 1 day
    }
  );
};

module.exports = generateToken;
