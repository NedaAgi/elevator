import { CallList } from "../models/callList.model";
import { Lift } from "../models/lift.model";
import { LiftCall } from "../models/liftCall.model";
import { Queue } from "../utils/queue.util";
import { DEFAULT_STATE } from "../constants/defaultState.const";

export class LiftService {
  private callList: CallList;
  private liftStatus: [Lift, Lift];
  private isLiftAEmpty: boolean;
  private isLiftBEmpty: boolean;

  constructor() {
    this.callList = new Queue();
    this.liftStatus = DEFAULT_STATE;
    this.isLiftAEmpty = true;
    this.isLiftBEmpty = true;
  }

  public registerNewLiftCall(data: LiftCall) {
    this.callList.enqueue(data);
    console.log("New item added");
    console.log(this.callList);

    this.triggerHandleLiftCalls();
  }

  public updateLiftStatus(data: Partial<Lift>, liftIndex: number) {
    // TODO: refactor and handle final destination selected
    this.liftStatus[liftIndex] = { ...this.liftStatus[liftIndex], ...data };
  }

  private async handleLiftCall(): Promise<void> {
    // TODO: refactor and handle lift moving
    const firstLiftCall = this.callList.peek();
    console.log(firstLiftCall);

    if (firstLiftCall) {
      const liftToServe: number = this.getLiftToServe(firstLiftCall);
      console.log("Selected lift:", liftToServe);

      if (liftToServe >= 0) {
        if (!liftToServe) {
          console.log("lift A is busy.");
          this.isLiftAEmpty = false;
        } else {
          console.log("lift B is busy.");
          this.isLiftBEmpty = false;
        }
        this.callList.dequeue();
        setTimeout(() => {
          console.log("removed element");
          console.log(this.callList);
          if (!liftToServe) {
            console.log("lift A is free.");
            this.isLiftAEmpty = true;
          } else {
            console.log("lift B is free.");
            this.isLiftBEmpty = true;
          }
        }, 5000);
      }
      this.triggerHandleLiftCalls();
    }
  }

  private triggerHandleLiftCalls() {
    if ((this.isLiftAEmpty || this.isLiftBEmpty) && !this.callList.isEmpty()) {
      this.handleLiftCall();
    } else if (!this.callList.isEmpty()) {
      // if both lifts are busy retry in 3000 ms
      setTimeout(() => {
        this.triggerHandleLiftCalls();
      }, 3000);
    }
  }

  private getLiftToServe(liftCall: LiftCall): number {
    if (this.isLiftAEmpty && this.isLiftBEmpty) {
      const distanceFromA = liftCall.position - this.liftStatus[0].position;
      const distanceFromB = liftCall.position - this.liftStatus[1].position;

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
    } else if (this.isLiftAEmpty) {
      return 0;
    } else if (this.isLiftBEmpty) {
      return 1;
    } else {
      return -1;
    }
  }
}
