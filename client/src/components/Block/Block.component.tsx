import { FC, useEffect, useState } from "react";
import { StyledBlock } from "./Block.styled";
import { Floor } from "../Floor/Floor.component";
import { FloorNumber } from "../../types/FloorNumber.type";
import { floorIndexList } from "../../utils/consts/FloorIndexList.const";
import { LiftAlert } from "../../types/LiftAlert.type";
import { LiftStatus } from "../../types/LiftStatus.type";

const WS_URL = "ws://localhost:5000";

export const Block: FC = () => {
  const [liftStatus, setLiftStatus] = useState<LiftStatus>([]);
  const [liftAlert, setLiftAlert] = useState<LiftAlert>();

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      ws.send("connecting");
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (!response.alertMessage) {
        setLiftStatus(response);
        if (response.liftIndex === liftAlert?.liftIndex) {
          setLiftAlert(undefined);
        }
      } else {
        setLiftAlert(response);
      }
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, []);

  if (liftAlert?.liftIndex) console.log(liftAlert);

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
              liftAlert={liftAlert}
            />
          ))}
        </div>
      </StyledBlock>
    );
  } else {
    return <div></div>;
  }
};
