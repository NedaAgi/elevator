import Joi from "joi";
import { Lift } from "../models/lift.model";

export const updateLiftStatusRequestValidator = Joi.object<Lift>({
  liftIndex: Joi.number().integer().min(0).max(1).required().messages({
    "any.required": "The liftIndex attribute is required",
  }),
  position: Joi.number().integer().min(0).max(6).required().messages({
    "any.required": "The position attribute is required",
  }),
  destination: Joi.number().integer().min(0).max(6).required().messages({
    "any.required": "The destination attribute is required",
  }),
  isInMovement: Joi.boolean().required().messages({
    "any.required": "The isInMovement attribute is required",
  }),
});
