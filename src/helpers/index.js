import { jwtDecode } from "jwt-decode";

export const token = localStorage.getItem("access_token");

export const decodedToken = token ? jwtDecode(token) : null;

export const BASE_URL = "http://104.248.20.53:8000";
