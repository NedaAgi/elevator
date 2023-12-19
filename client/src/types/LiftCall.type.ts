import { Direction } from "../enums/Direction.enum";
import { FloorNumber } from "./FloorNumber.type";

export type LiftCall = {
  position: FloorNumber;
  direction: Direction;
};
