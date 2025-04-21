import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import app from "./app";
import { MongoConnection } from "./db/MongoConnection";

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydb";

async function startServer() {
  try {
    await MongoConnection.connect(MONGO_URI);

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });

    const gracefulShutdown = (signal: NodeJS.Signals) => {
      console.info(`Received ${signal}, shutting down gracefully...`);
      server.close((err) => {
        if (err) {
          console.error("Error closing HTTP server", err);
          process.exit(1);
        }
        mongoose.connection
          .close()
          .then(() => {
            console.log("✅ MongoDB connection closed.");
            process.exit(0);
          })
          .catch((err) => {
            console.error("❌ Error closing MongoDB connection:", err);
            process.exit(1);
          });
      });
    };

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
