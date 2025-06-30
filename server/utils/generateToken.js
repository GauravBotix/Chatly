/* setting the payload of userId in id and then later accessing the payload using this .id feild only if used {userId } then can be accessed using .userId and not .id */

import jwt from "jsonwebtoken";
const generateToken = async (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY_TOKEN, {
    expiresIn: "7d",
  });

  const Production = process.env.NODE_ENV === "production";

  const cookiesOption = {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  };
  // const cookiesOption = {
  //   httpOnly: true,
  //   sameSite: Production ? "None" : "Lax",
  //   secure: Production,
  // };

  res.cookie("JWTToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    ...cookiesOption,
  });
  return token;
};
export default generateToken;

/* 
import jwt from "jsonwebtoken";

const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_KEY_ACCESS_TOKEN, {
    expiresIn: "5h",
  });
};
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_KEY_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
};

export const generateTokensAndSetCookies = async (res, user) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  const cookiesOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  };
  res.cookie("AccessToken", accessToken, {
    ...cookiesOption,
    maxAge: 5 * 60 * 60 * 1000,
  });
  res.cookie("RefreshToken", refreshToken, {
    ...cookiesOption,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return { accessToken, refreshToken };
};
 */

/* and in the login controller: */

/* import { generateTokensAndSetCookies } from "../utils/authToken.js";
const loginController = async (req, res) => {
  await generateTokensAndSetCookies(res, user);
 .....
};
 */
