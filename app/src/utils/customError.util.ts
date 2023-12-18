import { HttpStatus } from "../enums/httpStatus.enum";

export class CustomError extends Error {
  public status: HttpStatus;

  constructor(status: HttpStatus, message: string) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
