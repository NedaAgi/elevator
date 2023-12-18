import { Router, Request, Response } from "express";
import { LiftService } from "../services/lift.service";
import { LiftCall } from "../models/liftCall.model";
import { Lift } from "../models/lift.model";
import { addLiftCallRequestValidator } from "../validators/addLiftCall.validator";

// TODO: Add validators and error handling

export const liftRoute = (router: Router, liftService: LiftService) => {
  router.post("/lift/call", async (req: Request, res: Response) => {
    try {
      const result = addLiftCallRequestValidator.validate(req.body);
      if (result.error) {
        throw new Error("Validation error");
      }
      const data: LiftCall = result.value;
      liftService.registerNewLiftCall(data);
      res.status(200).send("Request succesful");
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  });

  router.put("/lift/destination", async (req: Request, res: Response) => {
    try {
      const data: Partial<Lift> = {
        liftIndex: req.body.liftIndex,
        position: req.body.position,
        isInMovement: req.body.isInMovement,
        destination: req.body.destination,
      };
      if (data.liftIndex) {
        liftService.updateLiftStatus(data, data.liftIndex);
        res.status(200).send("Request succesful");
      } else {
        res.status(400).send("Index missing");
      }
    } catch (error) {}
  });

  return router;
};
