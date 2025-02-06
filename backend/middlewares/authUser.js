import jwt from "jsonwebtoken";

const userAuthentication = async (req, res, next) => {
  try {
    const token = req.headers?.token || req.cookies?.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.body.userId = decodeToken.id;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "Invalid or expired token" });
  }
};

export { userAuthentication };
