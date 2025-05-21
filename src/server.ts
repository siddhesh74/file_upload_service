import { createApp } from "./app";
import { initializeDB } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await initializeDB();
    const app = createApp();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
