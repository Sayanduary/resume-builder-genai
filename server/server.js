import { configDotenv } from "dotenv";
import app from "./src/app.js";
import connectDatabase from "./src/config/db.js";
import {
  dummyJobDescription,
  dummyResume,
  dummySelfDescription,
} from "./src/services/test.js";

import { generateInterviewReport } from "./src/services/ai.service.js";

configDotenv();

const PORT = process.env.PORT || 3000;

process.on("uncaughtException", (err) => {
  console.error(" Uncaught Exception:", err.message);
  process.exit(1);
});

generateInterviewReport({
  dummyResume,
  dummySelfDescription,
  dummyJobDescription,
});
const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
};

startServer();

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
  process.exit(1);
});
