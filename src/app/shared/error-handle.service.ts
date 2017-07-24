import {EventEmitter, Injectable} from '@angular/core';
import {ErrorMessage} from './error-message.model';


@Injectable()
export class ErrorHandleService {
  errors: ErrorMessage[] = [];
  onErrorAdded = new EventEmitter<ErrorMessage> ();

  constructor() { }

  addError(error: ErrorMessage) {
    this.errors.push(error);
    console.log(this.errors);
    this.onErrorAdded.emit(error);
  }

  getErrors() {
    return this.errors.slice();
  }

}
