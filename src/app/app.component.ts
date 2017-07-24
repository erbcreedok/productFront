import {Component, OnDestroy, OnInit} from '@angular/core';
import {ErrorHandleService} from './shared/error-handle.service';
import {ErrorMessage} from './shared/error-message.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor() {}

  ngOnInit() {
  }

}
