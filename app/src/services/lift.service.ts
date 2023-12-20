import { CallList } from "../types/CallList.type";
import { FloorNumber, Lift } from "../types/Lift.type";
import { LiftCall } from "../types/LiftCall.type";
import { Queue } from "../utils/Queue.util";
import { Direction } from "../enums/Direction.enum";
import { LiftStatus } from "../types/LiftStatus.type";
import { LiftAlert } from "../types/LiftAlert.type";
import { DEFAULT_STATE } from "../constants/defaultState.const";
import { LiftIndex } from "../enums/LiftIndex.enum";
import { CustomError } from "../utils/CustomError.util";
import { CustomLogger } from "../utils/CustomLogger.util";
import { HttpStatus } from "../enums/HttpStatus.enum";

export class LiftService {
  private callList: CallList;
  private liftStatus: LiftStatus;
  private liftIsAvailable: Array<boolean>;

  private broadcast: (data: LiftStatus | LiftAlert) => void;

  constructor(broadcast: (data: any) => void) {
    this.callList = new Queue();
    this.liftStatus = DEFAULT_STATE;
    this.liftIsAvailable = [true, true];
    this.broadcast = broadcast;
  }

  public broadcastStatusForNewConnections = () => {
    this.broadcast(this.liftStatus);
  };

  public async registerNewLiftCall(data: LiftCall) {
    try {
      this.callList.enqueue(data);
      CustomLogger.logInfo(`Waiting queue ${JSON.stringify(this.callList)}`);
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

  private triggerHandleLiftCalls() {
    if (
      (this.liftIsAvailable[LiftIndex.A] ||
        this.liftIsAvailable[LiftIndex.B]) &&
      !this.callList.isEmpty()
    ) {
      this.handleLiftCall();
    } else if (!this.callList.isEmpty()) {
      // if both lifts are busy retry in 3000 ms
      CustomLogger.logInfo("Waiting for a lift ...");
      setTimeout(() => {
        this.triggerHandleLiftCalls();
      }, 3000);
    }
  }

  private async handleLiftCall(): Promise<void> {
    const firstLiftCall = this.callList.peek();
    if (firstLiftCall) {
      const liftToServe: number = this.getLiftToServe(firstLiftCall);

      if (liftToServe >= 0) {
        this.liftIsAvailable[liftToServe] = false;
        CustomLogger.logInfo(`lift ${liftToServe as LiftIndex} is busy.`);
        this.callList.dequeue();

        const destination: FloorNumber = firstLiftCall.position;
        this.updateLiftStatus({
          ...this.liftStatus[liftToServe],
          destination: destination,
          available: false,
        });
        if (destination !== this.liftStatus[liftToServe].position) {
          await this.moveLift(liftToServe, destination);
          this.updateLiftStatus({
            ...this.liftStatus[liftToServe],
            available: false,
            position: destination,
          });
        }
        this.handleLiftWaiting(liftToServe);
      }
      this.triggerHandleLiftCalls();
    }
  }

  private async sendLiftToFinalDestination(data: Lift) {
    const liftIndex: LiftIndex = data.liftIndex;
    const destination: FloorNumber = data.destination!;

    this.updateLiftStatus({
      ...this.liftStatus[liftIndex],
      destination: destination,
      available: false,
    });

    await this.moveLift(data.liftIndex, data.destination!);

    this.updateLiftStatus({
      ...this.liftStatus[data.liftIndex],
      position: destination,
      destination: undefined,
      available: true,
    });
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    this.liftIsAvailable[data.liftIndex] = true;
    CustomLogger.logInfo(`lift ${data.liftIndex as LiftIndex} is free.`);
  }

  private updateLiftStatus(data: Lift) {
    this.liftStatus[data.liftIndex] = {
      ...this.liftStatus[data.liftIndex],
      ...data,
    };

    this.broadcast(this.liftStatus);
  }

  private handleLiftWaiting = async (liftIndex: LiftIndex) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
    // after 5 seconds the lift will be alerted
    if (this.isLiftWaiting(liftIndex)) {
      this.broadcast({
        liftIndex: liftIndex,
        alertMessage: "Time is almost up!",
      });
      CustomLogger.logInfo(
        `destination not selected for lift ${liftIndex as LiftIndex}, alert!`
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      //after 3 more seconds the lift will become available
      if (this.isLiftWaiting(liftIndex)) {
        this.liftIsAvailable[liftIndex] = true;
        this.updateLiftStatus({
          ...this.liftStatus[liftIndex],
          destination: undefined,
          available: true,
        });
      }
    }
  };

  private isLiftWaiting = (liftIndex: LiftIndex): boolean => {
    return (
      this.liftStatus[liftIndex].position ===
        this.liftStatus[liftIndex].destination &&
      !this.liftIsAvailable[liftIndex]
    );
  };

  private async moveLift(liftToServe: LiftIndex, destination: FloorNumber) {
    const distance = destination - this.liftStatus[liftToServe].position;
    const movingDirection: Direction = Math.sign(distance) as Direction;
    for (let floor = 0; floor < Math.abs(distance) - 1; floor++) {
      const newPosition: FloorNumber = (this.liftStatus[liftToServe].position +
        movingDirection) as FloorNumber;
      this.updateLiftStatus({
        ...this.liftStatus[liftToServe],
        position: newPosition,
      });
      CustomLogger.logInfo(
        `Lift  ${liftToServe as LiftIndex} moving to: ${
          this.liftStatus[liftToServe]
        }`
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    }

    CustomLogger.logInfo(`Lift  ${liftToServe as LiftIndex} arrived`);
  }

  private getLiftToServe(liftCall: LiftCall): number {
    if (
      this.liftIsAvailable[LiftIndex.A] &&
      this.liftIsAvailable[LiftIndex.B]
    ) {
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
    } else if (this.liftIsAvailable[LiftIndex.A]) {
      return 0;
    } else if (this.liftIsAvailable[LiftIndex.B]) {
      return 1;
    } else {
      return -1;
    }
  }

  private checkLiftData(data: Lift): void {
    if (data.position !== this.liftStatus[data.liftIndex].position) {
      throw new CustomError(
        HttpStatus.INTERNAL_SERVER,
        "Destination request is not valid."
      );
    }
  }
}
