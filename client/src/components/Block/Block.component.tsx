import { FC, useEffect, useState } from "react";
import { StyledBlock } from "./Block.styled";
import { Floor } from "../Floor/Floor.component";
import { FloorNumber } from "../../types/FloorNumber.type";
import { floorIndexList } from "../../utils/consts/FloorIndexList.const";
import { LiftStatus } from "../../types/LiftStatus.type";
import { LiftIndex } from "../../enums/LiftIndex.enum";
import { LiftAlert } from "../../types/LiftAlert.type";
import { LiftData } from "../../types/LiftData.type";
import { LiftAlertStatus } from "../../types/LiftAlertStatus.type";

const WS_URL = "ws://localhost:5000";

export const Block: FC = () => {
  const [liftStatus, setLiftStatus] = useState<LiftStatus>([]);
  const [liftAlertStatus, setLiftAlertStatus] = useState<LiftAlertStatus>([]);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      ws.send("connecting");
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (!response.alertMessage) {
        const liftIndex: LiftIndex = response.liftIndex;
        changeLiftStatus(liftIndex, response);
        changeLiftAlert(liftIndex, undefined);
      } else {
        changeLiftAlert(response.liftIndex, response);
      }
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, []);

  const changeLiftAlert = (
    liftIndex: LiftIndex,
    data: LiftAlert | undefined
  ) => {
    setLiftAlertStatus((prevState) => {
      const newState = [...prevState];
      newState[liftIndex] = data;
      return newState;
    });
  };

  const changeLiftStatus = (liftIndex: LiftIndex, data: LiftData) => {
    setLiftStatus((prevState) => {
      const newState = [...prevState];
      newState[liftIndex] = data;
      return newState;
    });
  };

  if (liftStatus && liftStatus.length === 2) {
    return (
      <StyledBlock className="block">
        <div className="lift-names text">
          <div>A</div>
          <div>B</div>
        </div>
        <div className="floor-list">
          {floorIndexList.map((_, floorIndex) => (
            <Floor
              key={floorIndex}
              floorIndex={floorIndex as FloorNumber}
              liftStatus={liftStatus}
              liftAlertStatus={liftAlertStatus}
            />
          ))}
        </div>
      </StyledBlock>
    );
  } else {
    return <div></div>;
  }
};
