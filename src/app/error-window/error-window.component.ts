import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ErrorMessage} from '../shared/error-message.model';
import {ErrorHandleService} from '../shared/error-handle.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-error-window',
  templateUrl: './error-window.component.html',
  styleUrls: ['./error-window.component.css']
})
export class ErrorWindowComponent implements OnInit, OnDestroy {

  errorSubscription: Subscription;
  errorMessage: ErrorMessage;

  isClose = '';

  constructor(private errorHandleService: ErrorHandleService) { }

  ngOnInit() {
    this.errorSubscription = this.errorHandleService.onErrorAdded.subscribe(
        (error: ErrorMessage) => {
          this.errorMessage = error;
        }
    );
  }

  onCloseWindow() {
      this.errorMessage = null;
  }

  ngOnDestroy() {
      this.errorSubscription.unsubscribe();
  }

}
