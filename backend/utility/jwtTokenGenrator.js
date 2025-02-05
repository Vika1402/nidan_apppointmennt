import jwt from "jsonwebtoken";

const accessTokenGeneratorFromJWT = (email, password) => {
  try {
    return jwt.sign({ email, password }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    });
  } catch (error) {
    console.error("Error generating access token:", error);
    throw new Error("Token generation failed");
  }
};

export { accessTokenGeneratorFromJWT };
