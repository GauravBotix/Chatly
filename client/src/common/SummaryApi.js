const baseUrl = import.meta.env.VITE_API_URL;
const SummaryApi = {
  signup: {
    url: "auth/signup",
    method: "post",
  },
  login: {
    url: "auth/login",
    method: "post",
  },
  check_user: {
    url: "auth/check_user",
    method: "get",
  },
  upload_profile: {
    url: "auth/upload-profile",
    method: "put",
  },
  logout: {
    url: "auth/logout",
    method: "get",
  },
  getUser: {
    url: "message/user",
    method: "get",
  },
  getMessage: (userId) => ({
    url: `message/${userId}`,
    method: "get",
  }),

  sendMessage: (receiverId) => ({
    url: `message/send/${receiverId}`,
    method: "post",
  }),
};

export default SummaryApi;
