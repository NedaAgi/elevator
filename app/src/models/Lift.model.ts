import { LiftIndex } from "../enums/liftIndex.enum";

export type Lift = {
  liftIndex: LiftIndex;
  position: FloorNumber;
  destination?: FloorNumber;
  isInMovement: boolean;
};

export type FloorNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
