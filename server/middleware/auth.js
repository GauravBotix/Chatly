import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.JWTToken || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Please Login" || "Token not found",
        error: true,
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    if (!decode) {
      return res.status(404).json({
        message: "Not a valid token",
        error: true,
        success: false,
      });
    }
    console.log("JWTToken in cookies:", req.cookies?.JWTToken);
    console.log("Authorization header:", req.headers?.authorization);

    req.userId = decode.id;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Please Login" || error.message || error,
      success: false,
      error: true,
    });
  }
};
export default auth;
/* decode.id is from the payload in which we are setting the payload as jwt.sign({id:userId}) so id , if using simply jwt.sign({userId}) then here the payload is set as userId and have to access decode.userId and not decode.id */
