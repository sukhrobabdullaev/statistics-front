import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("access_token");

export const decodedToken = token ? jwtDecode(token) : null;

export const BASE_URL = "https://reportx.hsat.uz";
