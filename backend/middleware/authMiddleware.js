const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log("Decoded Token:", decoded); // Debugging: Check if userId exists

    req.user = { userId: decoded.userId };
    if (!req.user.userId) {
      return res.status(400).json({ message: "Invalid token, userId missing" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
