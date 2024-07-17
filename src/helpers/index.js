import { jwtDecode } from "jwt-decode";

export const token = localStorage.getItem("access_token");

export const decodedToken = token ? jwtDecode(token) : null;

export const BASE_URL = "https://hsat.uz/api";

export const typeletter_id = localStorage.getItem("template_id") || "1";

export const isTemplate = (typeletter_id) => {
  if (typeletter_id == "1") {
    return "Ko'rsatma xati";
  } else if (typeletter_id == "2") {
    return "Chaqiruv xati";
  } else {
    return "Sud xati";
  }
};
