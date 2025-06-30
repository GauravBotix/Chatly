import auth from "../middleware/auth.js";
import userModal from "../models/user.models.js";
import cloudinary from "../utils/uploadImageCloudinary.js";
import messageModal from "../models/message.models.js";
import { getReceiverSocketId ,io} from "../lib/socket.js";

const getUserSidebar = async (req, res) => {
  try {
    const loggedUsers = req.userId;

    const filteredUser = await userModal
      .find({ _id: { $ne: loggedUsers } })
      .select("-password");
    // console.log("filteredUser", filteredUser);

    res.status(200).json({
      message: "Other users found successfully",
      success: true,
      error: false,
      data: filteredUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const myId = req.userId; /* from the auth middleware */
    const { id: userToChatId } = req.params;

    const messages = await messageModal.find({
      $or: [
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId },
      ],
    });
    res.status(200).json({
      message: "All messages between users",
      success: true,
      error: false,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

const sendMessages = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.userId;
    const { id: recieverId } = req.params;

    let imageUrl;
    if (image) {
      const uploadImage = await cloudinary.uploader.upload(image, {
        folder: "Chatly",
      });
      imageUrl = uploadImage.secure_url;
    }
    const newMessage = new messageModal({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    
    const receiverSocketId = getReceiverSocketId(recieverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }
    /* realtime functionality goes here using socket.io . */
    res.status(200).json({
      message: "Message send",
      success: true,
      error: false,
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { getUserSidebar, getMessages, sendMessages };
