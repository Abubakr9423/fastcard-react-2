import axios from "axios";

export const SaveToken = (token:any) => {
  localStorage.setItem("authToken", token);
};
export const GetToken = () => {
  return localStorage.getItem("authToken");
};

export const axiosRequest = axios.create({
  baseURL: "https://store-api.softclub.tj",
});
axiosRequest.interceptors.request.use(
  (config:any) => {
    const token = GetToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error:any) => Promise.reject(error)
);



// import axios from "axios";

// // --- Token helpers ---
// export const SaveToken = (token: string) => {
//   localStorage.setItem("authToken", token);
// };

// export const GetToken = (): string | null => {
//   return localStorage.getItem("authToken");
// };

// export const ClearToken = () => {
//   localStorage.removeItem("authToken");
// };

// // --- Axios instance ---
// export const axiosRequest = axios.create({
//   baseURL: "https://store-api.softclub.tj",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // --- Request interceptor ---
// axiosRequest.interceptors.request.use(
//   (config: any) => {
//     const token = GetToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error: any) => Promise.reject(error)
// );

// // --- Response interceptor ---
// axiosRequest.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Token invalid → clear it and redirect/logout
//       ClearToken();
//       // Example: redirect to login page
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );