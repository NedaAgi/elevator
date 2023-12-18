import Joi from "joi";
import { LiftCall } from "../models/liftCall.model";

export const addLiftCallRequestValidator = Joi.object<LiftCall>({
  position: Joi.number().integer().min(0).max(6).required().messages({
    "any.required": "The position attribute is required",
  }),
  direction: Joi.number().valid(1, -1).required().messages({
    "any.required": "The direction attribute is required",
  }),
});
