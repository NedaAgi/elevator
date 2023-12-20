import { v4 as uuidv4 } from "uuid";
import { NextFunction, Request, Response } from "express";
import { CustomLogger } from "./CustomLogger.util";

interface ExtendedRequest extends Request {
  requestId?: string;
}

const loggerMiddleware = () => {
  return (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const requestId = uuidv4();
    req.requestId = requestId;

    const { method, originalUrl, body } = req;
    CustomLogger.logApiRequest(requestId, method, originalUrl, body);

    const originalSend = res.send.bind(res);
    res.send = function (body?: any): Response {
      CustomLogger.logApiResponse(requestId, body);
      return originalSend(body);
    };

    next();
  };
};

export default loggerMiddleware;
