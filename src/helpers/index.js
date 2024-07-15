import { jwtDecode } from "jwt-decode";

export const token = localStorage.getItem("access_token");

export const decodedToken = token ? jwtDecode(token) : null;

export const BASE_URL = "http://45.55.194.72:8003/api";

export const typeletter_id = localStorage.getItem("template_id");
