import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorHandleService} from './shared/error-handle.service';
import {ErrorMessage} from './shared/error-message.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app';
  errorSubscription: Subscription;
  errorMessage: ErrorMessage;

  constructor(private errorHandleService: ErrorHandleService) {}

  ngOnInit() {
    this.errorSubscription = this.errorHandleService.onErrorAdded.subscribe(
        (error: ErrorMessage) => {
          this.errorMessage = error;
          setTimeout(() => { this.errorMessage = null }, 5000);
        }
    );
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
