import { Router, Request, Response } from "express";
import { LiftService } from "../services/Lift.service";
import { LiftCall } from "../types/LiftCall.type";
import { Lift } from "../types/Lift.type";
import { addLiftCallRequestValidator } from "../validators/AddLiftCall.validator";
import { updateLiftStatusRequestValidator } from "../validators/UpdateLiftStatus.validator";
import { HttpStatus } from "../enums/HttpStatus.enum";
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
