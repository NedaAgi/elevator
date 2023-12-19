import { FC } from "react";
import { StyledPositionIndicator } from "./PositionIndicator.styled";
import { FloorNumber } from "../../types/FloorNumber.type";
import classNames from "classnames";
import { floorIndexList } from "../../utils/consts/FloorIndexList.const";

export type PositionIndicatorProps = {
  position: FloorNumber;
};

export const PositionIndicator: FC<PositionIndicatorProps> = ({ position }) => {
  return (
    <StyledPositionIndicator className="position-indicator">
      {floorIndexList.map((_, index) => (
        <div
          key={index}
          className={classNames("disk", { active: position === index })}
        />
      ))}
    </StyledPositionIndicator>
  );
};
