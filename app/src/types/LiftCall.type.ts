import { Direction } from "../enums/Direction.enum";
import { FloorNumber } from "./Lift.type";

export type LiftCall = {
  position: FloorNumber;
  direction: Direction;
};
