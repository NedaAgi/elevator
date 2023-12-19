import { FC } from "react";
import classNames from "classnames";
import { StyledArrowIndicator } from "./ArrowIndicator.styled";
import { Direction } from "../../enums/Direction.enum";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";

export type ArrowIndicatorProps = {
  direction: Direction;
};

export const ArrowIndicator: FC<ArrowIndicatorProps> = ({ direction }) => {
  return (
    <StyledArrowIndicator className="arrow-indicator">
      <Arrow
        className={classNames("arrow", {
          active: direction === Direction.DOWN,
        })}
      />
      <Arrow
        className={classNames("arrow", "down", {
          active: direction === Direction.UP,
        })}
      />
    </StyledArrowIndicator>
  );
};
