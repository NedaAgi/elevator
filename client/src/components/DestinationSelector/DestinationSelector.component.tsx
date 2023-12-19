import { FC } from "react";
import { FloorNumber } from "../../types/FloorNumber.type";
import { StyledDestinationSelector } from "./DestinationSelector.styled";
import { floorIndexList } from "../../utils/consts/FloorIndexList.const";

export type DestinationSelectorProps = {
  onDestinationSelected: (index: FloorNumber) => void;
};

export const DestinationSelector: FC<DestinationSelectorProps> = ({
  onDestinationSelected,
}) => {
  return (
    <StyledDestinationSelector className="destination-selector">
      {floorIndexList.map((_, index) => (
        <div
          key={index}
          className="destination-button"
          onClick={() => onDestinationSelected(index as FloorNumber)}
        >
          {index ? index : "P"}
        </div>
      ))}
    </StyledDestinationSelector>
  );
};
