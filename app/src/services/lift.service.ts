import { CallList } from "../models/callList.model";
import { FloorNumber, Lift } from "../models/lift.model";
import { LiftCall } from "../models/liftCall.model";
import { Queue } from "../utils/queue.util";
import { DEFAULT_STATE } from "../constants/defaultState.const";
import { LiftIndex } from "../enums/liftIndex.enum";
import { Direction } from "../enums/direction.enum";
import { CustomError } from "../utils/customError.util";
import { HttpStatus } from "../enums/httpStatus.enum";

export class LiftService {
  private callList: CallList;
  private liftStatus: Array<Lift>;
  private liftIsEmpty: Array<boolean>;

  private broadcast: (data: any) => void;

  constructor(broadcast: (data: any) => void) {
    this.callList = new Queue();
    this.liftStatus = DEFAULT_STATE;
    this.liftIsEmpty = [true, true];
    this.broadcast = broadcast;
  }

  public async registerNewLiftCall(data: LiftCall) {
    try {
      this.callList.enqueue(data);
      console.log("New item added");
      console.log(this.callList);

      this.triggerHandleLiftCalls();
    } catch (error: any) {
      throw error;
    }
  }

  public async setLiftFinalDestination(data: Lift) {
    try {
      this.checkLiftData(data);
      this.sendLiftToFinalDestination(data);
    } catch (error: any) {
      throw error;
    }
  }

  private async sendLiftToFinalDestination(data: Lift) {
    await this.moveLift(data.liftIndex, data.destination!);
    this.liftIsEmpty[data.liftIndex] = true;
    console.log(`lift ${data.liftIndex as LiftIndex} is free.`);
  }

  private updateLiftStatus(data: Lift) {
    this.liftStatus[data.liftIndex] = {
      ...this.liftStatus[data.liftIndex],
      ...data,
    };
  }

  private async handleLiftCall(): Promise<void> {
    // TODO: refactor and handle lift moving
    const firstLiftCall = this.callList.peek();
    if (firstLiftCall) {
      const liftToServe: number = this.getLiftToServe(firstLiftCall);
      console.log("Selected lift:", liftToServe);
      if (liftToServe >= 0) {
        this.liftIsEmpty[liftToServe] = false;
        console.log(`lift ${liftToServe as LiftIndex} is busy.`);
        this.callList.dequeue();
        console.log("removed element");
        await this.moveLift(liftToServe, firstLiftCall.position);
      }
      this.triggerHandleLiftCalls();
    }
  }

  private triggerHandleLiftCalls() {
    if (
      (this.liftIsEmpty[LiftIndex.A] || this.liftIsEmpty[LiftIndex.B]) &&
      !this.callList.isEmpty()
    ) {
      this.handleLiftCall();
    } else if (!this.callList.isEmpty()) {
      // if both lifts are busy retry in 3000 ms
      console.log("Waiting for a lift ...");
      setTimeout(() => {
        this.triggerHandleLiftCalls();
      }, 3000);
    }
  }

  private async moveLift(liftToServe: LiftIndex, destination: FloorNumber) {
    this.updateLiftStatus({
      ...this.liftStatus[liftToServe],
      destination: destination,
      isInMovement: true,
    });
    // TODO: broadcast change
    this.broadcast(this.liftStatus);
    const distance = destination - this.liftStatus[liftToServe].position;
    const movingDirection: Direction = Math.sign(distance) as Direction;
    for (let floor = 0; floor < Math.abs(distance); floor++) {
      const newPosition: FloorNumber = (this.liftStatus[liftToServe].position +
        movingDirection) as FloorNumber;
      this.updateLiftStatus({
        ...this.liftStatus[liftToServe],
        position: newPosition,
      });
      // TODO: broadcast position change
      this.broadcast(this.liftStatus);
      console.log(
        `Lift  ${liftToServe as LiftIndex} moving: `,
        this.liftStatus[liftToServe]
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    }
    this.updateLiftStatus({
      ...this.liftStatus[liftToServe],
      destination: undefined,
      isInMovement: false,
    });
    // TODO: broadcast change
    this.broadcast(this.liftStatus);

    console.log(`Lift  ${liftToServe as LiftIndex} arrived`);
  }

  private getLiftToServe(liftCall: LiftCall): number {
    // refactor, create distance arrays
    if (this.liftIsEmpty[LiftIndex.A] && this.liftIsEmpty[LiftIndex.B]) {
      const distanceFromA =
        liftCall.position - this.liftStatus[LiftIndex.A].position;
      const distanceFromB =
        liftCall.position - this.liftStatus[LiftIndex.B].position;

      const absDistanceFromA = Math.abs(distanceFromA);
      const absDistanceFromB = Math.abs(distanceFromB);
      if (absDistanceFromA < absDistanceFromB) {
        return 0;
      } else if (absDistanceFromA > absDistanceFromB) {
        return 1;
      } else {
        // in case of equal distance the lift from bellow will be chosen
        if (distanceFromA) {
          return 0;
        } else {
          return 1;
        }
      }
    } else if (this.liftIsEmpty[LiftIndex.A]) {
      return 0;
    } else if (this.liftIsEmpty[LiftIndex.B]) {
      return 1;
    } else {
      return -1;
    }
  }

  private checkLiftData(data: Lift): void {
    if (this.liftStatus[data.liftIndex].isInMovement) {
      throw new CustomError(
        HttpStatus.INTERNAL_SERVER,
        "Destination already selected."
      );
    }

    if (data.position !== this.liftStatus[data.liftIndex].position) {
      throw new CustomError(
        HttpStatus.INTERNAL_SERVER,
        "Destination request is not valid."
      );
    }
  }
}
