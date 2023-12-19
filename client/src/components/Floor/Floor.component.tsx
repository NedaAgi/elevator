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
  index: FloorNumber;
  liftStatus: LiftStatus;
  liftAlert?: LiftAlert;
};

export const Floor: FC<FloorProps> = ({ index, liftStatus, liftAlert }) => {
  const getLiftDirection = (index: LiftIndex): Direction => {
    const destination: FloorNumber | undefined = liftStatus[index].destination;
    if (destination === undefined) {
      return Direction.IN_PLACE;
    } else {
      if (liftStatus[index].position - destination > 0) {
        return Direction.DOWN;
      } else {
        return Direction.UP;
      }
    }
  };

  const handleLiftCall = async (direction: Direction) => {
    const liftCall: LiftCall = {
      direction: direction,
      position: index,
    };
    try {
      await ApiService.createLiftCall(liftCall);
    } catch (error) {
      console.error("Error with calling the lift", error);
    }
  };

  return (
    <StyledFloor className="floor">
      <div className="floor-number">{index ? index : "P"}</div>
      <div>
        <ArrowIndicator direction={getLiftDirection(LiftIndex.A)} />
        <div className="lift-container">
          {liftStatus[LiftIndex.A]?.position === index && (
            <Lift
              liftData={liftStatus[LiftIndex.A]}
              isAlertOn={liftAlert?.liftIndex === LiftIndex.A}
            />
          )}
        </div>
        <CallButtons onCallButtonClicked={handleLiftCall} />
        <div className="lift-container">
          {liftStatus[LiftIndex.B]?.position === index && (
            <Lift
              liftData={liftStatus[LiftIndex.B]}
              isAlertOn={liftAlert?.liftIndex === LiftIndex.B}
            />
          )}
        </div>
        <ArrowIndicator direction={getLiftDirection(LiftIndex.B)} />
      </div>
    </StyledFloor>
  );
};
