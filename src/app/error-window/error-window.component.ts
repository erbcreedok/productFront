import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ErrorMessage} from '../shared/error-message.model';

@Component({
  selector: 'app-error-window',
  templateUrl: './error-window.component.html',
  styleUrls: ['./error-window.component.css']
})
export class ErrorWindowComponent implements OnInit {
  @Input() message: ErrorMessage;

  constructor() { }

  ngOnInit() {
  }

}
