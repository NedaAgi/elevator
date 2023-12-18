import { Direction } from "../enums/direction.enum";
import { FloorNumber } from "./lift.model";

export type LiftCall = {
  position: FloorNumber;
  direction: Direction;
};
