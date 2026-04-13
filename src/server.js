import dotenv from "dotenv";
import app from "./app.js";
import logger from "./utils/logger.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

try {
  app.listen(PORT, () => {
    logger.info(`Server is running on PORT: ${PORT}`);
  });
} catch (error) {
  logger.error("Failed to start server", {
    message: error.message,
    stack: error.stack,
  });
  process.exit(1);
}
