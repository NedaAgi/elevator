import { FC } from "react";
import { FloorNumber } from "../../types/FloorNumber.type";
import { StyledFloor } from "./Floor.styled";
import { Direction } from "../../enums/Direction.enum";
import { ArrowIndicator } from "../ArrowIndicator/ArrowIndicator.component";
import { CallButtons } from "../CallButtons/CallButtons.component";
import { Lift } from "../Lift/Lift.component";
import { LiftStatus } from "../../types/LiftStatus.type";
import { LiftIndex } from "../../enums/LiftIndex.enum";
import { LiftCall } from "../../types/LiftCall.type";
import { ApiService } from "../../services/api.service";
import { LiftAlert } from "../../types/LiftAlert.type";

export type FloorProps = {
  floorIndex: FloorNumber;
  liftStatus: LiftStatus;
  liftAlert?: LiftAlert;
};

export const Floor: FC<FloorProps> = ({
  floorIndex,
  liftStatus,
  liftAlert,
}) => {
  const getLiftDirection = (liftIndex: LiftIndex): Direction => {
    const destination: FloorNumber | undefined =
      liftStatus[liftIndex].destination;
    if (destination !== undefined) {
      const distance: number = liftStatus[liftIndex].position - destination;
      if (!distance) {
        // destination was not yet selected
        return Direction.IN_PLACE;
      } else {
        if (distance > 0) {
          return Direction.DOWN;
        } else {
          return Direction.UP;
        }
      }
    } else {
      // lift is available
      return Direction.IN_PLACE;
    }
  };

  const handleLiftCall = async (direction: Direction) => {
    const liftCall: LiftCall = {
      direction: direction,
      position: floorIndex,
    };
    try {
      await ApiService.createLiftCall(liftCall);
    } catch (error) {
      console.error("Error with calling the lift", error);
    }
  };

  return (
    <StyledFloor className="floor">
      <ArrowIndicator direction={getLiftDirection(LiftIndex.A)} />
      <div className="lift-container">
        {liftStatus[LiftIndex.A]?.position === floorIndex && (
          <Lift
            liftData={liftStatus[LiftIndex.A]}
            isAlertOn={liftAlert?.liftIndex === LiftIndex.A}
          />
        )}
      </div>
      <div className="floor-center">
        <div className="text">{floorIndex ? floorIndex : "P"}</div>
        <CallButtons onCallButtonClicked={handleLiftCall} />
      </div>
      <div className="lift-container">
        {liftStatus[LiftIndex.B]?.position === floorIndex && (
          <Lift
            liftData={liftStatus[LiftIndex.B]}
            isAlertOn={liftAlert?.liftIndex === LiftIndex.B}
          />
        )}
      </div>
      <ArrowIndicator direction={getLiftDirection(LiftIndex.B)} />
    </StyledFloor>
  );
};
