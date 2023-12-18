import { Router, Request, Response } from "express";
import { LiftService } from "../services/lift.service";
import { LiftCall } from "../models/liftCall.model";
import { Lift } from "../models/lift.model";
import { addLiftCallRequestValidator } from "../validators/addLiftCall.validator";
import { updateLiftStatusRequestValidator } from "../validators/updateLiftStatus.validator";
import { HttpStatus } from "../enums/httpStatus.enum";
import { CustomError } from "../utils/customError.util";

export const liftRoute = (router: Router, liftService: LiftService) => {
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
        isInMovement: req.body.isInMovement,
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
