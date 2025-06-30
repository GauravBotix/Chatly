import userModal from "../models/user.models.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../utils/uploadImageCloudinary.js";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({
        message: "Provide all credentials",
        sucess: false,
        error: true,
      });
    }
    const user = await userModal.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists",
        error: true,
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModal({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(res, newUser._id);
      await newUser.save();
    }
    return res.status(201).json({
      message: "Registered Successfully",
      success: true,
      error: false,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        message: "Provide all credentials",
        sucess: false,
        error: true,
      });
    }
    const user = await userModal.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid userName or password",
        error: true,
        success: false,
      });
    }
    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (!isMatchedPassword) {
      return res.status(401).json({
        message: "Invalid userName or password",
        success: false,
        error: true,
      });
    }
    generateToken(res, user._id);
    return res.status(200).json({
      message: "Login Successfull",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const logout = (req, res) => {
  try {
    const Production = process.env.NODE_ENV === "production";
    const cookiesOption = {
      httpOnly: true,
      sameSite: Production ? "None" : "Lax",
      secure: Production,
    };

    res.clearCookie("JWTToken", cookiesOption);

    return res.status(200).json({
      message: "Logout successful",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

/*this way of uploading image and then updating is not a efficient way, so use multer instead and cloudinary details also in separate file*/
const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.userId; /* from the auth middleware. */
    console.log("userId from auth middleware", userId);

    const { profilepic } = req.body;
    if (!profilepic) {
      return res.status(422).json({
        message: "Profile Picture required",
        error: true,
        success: false,
      });
    }
    const uploadResponse = await cloudinary.uploader.upload(profilepic, {
      folder: "Chatly",
    });
    const updateUser = await userModal.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.url },
      { new: true }
    );
    return res.status(200).json({
      message: "Upload Successfull",
      data: {
        imageUrl: uploadResponse.url,
        user: updateUser,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const checkUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModal.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not loggedIn",
        success: false,
        error: true,
      });
    }
    return res.status(200).json({
      message: "User found",
      success: true,
      error: false,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { login, logout, signup, uploadProfilePic, checkUser };
