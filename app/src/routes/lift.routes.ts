import { Router, Request, Response } from "express";
import { LiftCall } from "../types/LiftCall.type";
import { Lift } from "../types/Lift.type";
import { CustomError } from "../utils/CustomError.util";
import loggerMiddleware from "../utils/LoggerMiddleware.util";
import { LiftService } from "../services/lift.service";
import { HttpStatus } from "../enums/HttpStatus.enum";
import { addLiftCallRequestValidator } from "../validators/addLiftCall.validator";
import { updateLiftStatusRequestValidator } from "../validators/updateLiftStatus.validator";

export const liftRoute = (router: Router, liftService: LiftService) => {
  const middleware = loggerMiddleware();
  router.use(middleware);

  router.post("/lift/call", async (req: Request, res: Response) => {
    try {
      const result = addLiftCallRequestValidator.validate(req.body);
      if (result.error) {
        throw new CustomError(HttpStatus.VALIDATION_ERROR, "Validation error");
      }
      const data: LiftCall = result.value;
      await liftService.registerNewLiftCall(data);
      res.status(HttpStatus.OK).send("Request succesful");
    } catch (error: any) {
      res.status(error.status).send(error.message);
    }
  });

  router.put("/lift/destination", async (req: Request, res: Response) => {
    try {
      const result = updateLiftStatusRequestValidator.validate({
        liftIndex: req.body.liftIndex,
        position: req.body.position,
        destination: req.body.destination,
      });
      if (result.error) {
        throw new CustomError(HttpStatus.VALIDATION_ERROR, "Validation error");
      }
      const data: Lift = result.value;
      await liftService.setLiftFinalDestination(data);
      res.status(HttpStatus.OK).send("Request succesful");
    } catch (error: any) {
      res.status(error.status).send(error.message);
    }
  });

  return router;
};
