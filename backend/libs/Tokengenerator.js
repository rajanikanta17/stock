const jwt = require('jsonwebtoken');

require('dotenv').config();


const generateToken = async (user, res) => {
  try {
    const secretKey = process.env.SecretKey || process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error("Secret key is not defined in the environment variables.");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      secretKey,
      { expiresIn: '7d' }
    );

    console.log("Generated JWT:", token); 

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("Inventorymanagmentsystem", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: isProduction ? "None" : "Lax",
      secure: isProduction,
    });
    

    return token; 
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Failed to generate token");
  }
};

module.exports=generateToken;