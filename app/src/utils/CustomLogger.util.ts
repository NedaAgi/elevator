const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

type LogEntry = {
  level: string;
  message: string;
  timestamp: string;
};

const logFormat = combine(
  timestamp(),
  printf(({ level, message, timestamp }: LogEntry) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Create a logger instance with console transport
const logger = createLogger({
  format: logFormat,
  transports: [new transports.Console()],
});

class CustomLogger {
  static logApiRequest(
    requestId: string,
    requestType: string,
    url: string,
    requestBody: any
  ) {
    logger.info(
      `[${requestId}] API Request - ${requestType}: ${url} - Request Body: ${JSON.stringify(
        requestBody
      )}`
    );
  }

  static logApiResponse(requestId: string, response: any) {
    logger.info(
      `[${requestId}] API Response - Response Body: ${JSON.stringify(response)}`
    );
  }

  static logInfo(message: string) {
    logger.info(message);
  }

  static logError(error: Error | string) {
    logger.error("Error:", error);
  }
}

export { CustomLogger };
