import { FC } from "react";
import { FloorNumber } from "../../types/FloorNumber.type";
import { StyledLift } from "./Lift.styled";
import { PositionIndicator } from "../PositionIndicator/PositionIndicator.component";
import classNames from "classnames";
import { DestinationSelector } from "../DestinationSelector/DestinationSelector.component";
import { ApiService } from "../../services/api.service";
import { LiftData } from "../../types/LiftData.type";
import { LiftAlert } from "../../types/LiftAlert.type";

export type LiftProps = {
  liftData: LiftData;
  isAlertOn: boolean;
};

export const Lift: FC<LiftProps> = ({ liftData, isAlertOn }) => {
  const handleDestinationSelected = async (destination: FloorNumber) => {
    const updatedLiftData: LiftData = {
      ...liftData,
      destination,
    };
    try {
      await ApiService.updateLiftStatus(updatedLiftData);
    } catch (error) {
      console.error("Error with selecting the destination", error);
    }
  };
  return (
    <StyledLift
      className={classNames("lift", {
        free: liftData.available,
        alert: isAlertOn,
      })}
    >
      <div
        className={classNames({
          "hide-on-mobile": liftData.destination === liftData.position,
        })}
      >
        <PositionIndicator position={liftData.position} />
      </div>
      {liftData.destination === liftData.position && (
        <DestinationSelector
          onDestinationSelected={handleDestinationSelected}
        />
      )}
    </StyledLift>
  );
};
