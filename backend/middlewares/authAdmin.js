import jwt from "jsonwebtoken";

const adminAuthentication = async (req, res, next) => {
  try {
    const atoken = req.headers?.atoken || req.cookies?.atoken;
    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const decodeToken = jwt.verify(atoken, process.env.JWT_TOKEN_SECRET);

    if (decodeToken.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    next();
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

export { adminAuthentication };
