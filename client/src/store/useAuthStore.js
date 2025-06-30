import { create } from "zustand";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const baseUrl = import.meta.env.VITE_SOCKET_API_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSignup: false,
  isLoggedIn: false,
  isUpdatedProfile: false,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await Axios({
        ...SummaryApi.check_user,
      });
      const { data: responseData } = response;
      console.log("response from checkAuth", response);

      set({ authUser: responseData.data.user || responseData.data });
      get().connectSocket();
      console.log("authUser from checkAuth", get().authUser);
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signupAuth: async (data) => {
    try {
      set({ isSignup: true });

      const response = await Axios({
        ...SummaryApi.signup,
        data,
      });
      const { data: responseData } = response;
      set({ authUser: responseData });

      console.log("authUser from signupAuth", get().authUser);
      toast.success(responseData.message);
      get().connectSocket();
    } catch (error) {
      AxiosToastError(error);
    } finally {
      set({ isSignup: false });
    }
  },

  loginAuth: async (data) => {
    try {
      set({ isLoggedIn: true });
      const response = await Axios({
        ...SummaryApi.login,
        data,
      });
      const { data: responseData } = response;
      set({ authUser: responseData });
      console.log("authUser from loginAuth", get().authUser);
      toast.success(responseData.message);
      get().connectSocket();
    } catch (error) {
      AxiosToastError(error);
    } finally {
      set({ isLoggedIn: false });
    }
  },

  logoutAuth: async () => {
    try {
      set({ isLoggedIn: false });
      const response = await Axios({
        ...SummaryApi.logout,
      });
      const { data: responseData } = response;
      set({ authUser: null });
      toast.success(responseData.message);
      get().disconnetSocket();
    } catch (error) {
      AxiosToastError(error);
    }
  },

  uploadProfileAuth: async (data) => {
    try {
      set({ isUpdatedProfile: true });
      const response = await Axios({
        ...SummaryApi.upload_profile,
        data,
      });
      const { data: responseData } = response;
      set({ authUser: responseData });
      toast.success(responseData.message);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      set({ isUpdatedProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(baseUrl, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnetSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
