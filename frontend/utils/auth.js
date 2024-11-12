import api from "./axios";

export const redirectToDashboard = () => {
  window.location.href = "/dashboard";
};

export const login = async (email, password) => {
  const response = await api.post("api/auth/login/", { email, password });
  localStorage.setItem("token", response.data.access);
  localStorage.setItem("refresh_token", response.data.refresh);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  redirectToDashboard(); // Add this line
  return response.data;
};


export const logout = async () => {
  const refresh = localStorage.getItem("refresh_token");
  try {
    await api.post("api/auth/logout/", { refresh });
  } finally {
    localStorage.clear();
    window.location.href = "/login";
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};




export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh_token");
  const response = await api.post("api/auth/refresh/", { refresh });
  localStorage.setItem("token", response.data.access);
  return response.data;
};
