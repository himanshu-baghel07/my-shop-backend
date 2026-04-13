import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import logger from "./utils/logger.js";

const PORT = Number(process.env.PORT) || 5000;

try {
  app.listen(PORT, () => {
    logger.info(`Server is running on PORT: ${PORT}`);
  });
} catch (error) {
  const err = error instanceof Error ? error : new Error(String(error));
  logger.error("Failed to start server", {
    message: err.message,
    stack: err.stack,
  });
  process.exit(1);
}
