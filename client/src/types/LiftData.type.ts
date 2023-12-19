import { LiftIndex } from "../enums/LiftIndex.enum";
import { FloorNumber } from "./FloorNumber.type";

export type LiftData = {
  liftIndex: LiftIndex;
  position: FloorNumber;
  destination?: FloorNumber;
  available: boolean;
};
