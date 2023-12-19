import { LiftIndex } from "../enums/LiftIndex.enum";

export type Lift = {
  liftIndex: LiftIndex;
  position: FloorNumber;
  destination?: FloorNumber;
  available: boolean;
};

export type FloorNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
