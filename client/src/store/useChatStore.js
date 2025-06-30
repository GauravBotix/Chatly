import { create } from "zustand";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUser: async () => {
    try {
      set({ isUserLoading: true });
      const response = await Axios({
        ...SummaryApi.getUser,
      });
      const { data: responseData } = response;
      set({ users: responseData.data });
    } catch (error) {
      AxiosToastError(error);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    try {
      set({ isMessageLoading: true });
      const response = await Axios({
        ...SummaryApi.getMessage(userId),
      });
      const { data: responseData } = response;
      set({ messages: responseData.data });
    } catch (error) {
      AxiosToastError(error);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const response = await Axios({
        ...SummaryApi.sendMessage(selectedUser._id),
        data: messageData,
      });
      const { data: responseData } = response;
      set({ messages: [...messages, responseData.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
