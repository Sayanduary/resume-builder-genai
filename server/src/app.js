import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

/* Middlewares */
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))



/* Health check */
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* Routes */
import authRouter from "./routes/auth.routes.js";
app.use("/api/auth", authRouter);

/* GLOBAL ERROR HANDLER (VERY IMPORTANT) */
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
