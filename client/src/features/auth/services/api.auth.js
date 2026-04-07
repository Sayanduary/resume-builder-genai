import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/* ================= REGISTER ================= */
export async function register({ username, email, password }) {
  try {
    const res = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error(
      "REGISTER ERROR:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}

/* ================= LOGIN ================= */
export async function login({ email, password }) {
  try {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error.response?.data?.message || error.message
    );
    throw error; // ✅ CRITICAL FIX
  }
}

/* ================= LOGOUT ================= */
export async function logout() {
  try {
    const res = await api.get("/api/auth/logout");
    return res.data;
  } catch (error) {
    console.error(
      "LOGOUT ERROR:",
      error.response?.data?.message || error.message
    );
    throw error; // ✅ FIX
  }
}

/* ================= GET ME ================= */
export async function getMe() {
  try {
    const res = await api.get("/api/auth/getme");
    return res.data;
  } catch (error) {
    console.error(
      "GETME ERROR:",
      error.response?.data?.message || error.message
    );
    throw error; // ✅ FIX
  }
}