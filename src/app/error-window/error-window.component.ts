import {Component, EventEmitter, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-error-window',
  templateUrl: './error-window.component.html',
  styleUrls: ['./error-window.component.css']
})
export class ErrorWindowComponent implements OnInit {
  @Input() message = {header: '', body: ''};
  closeMe = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
    setTimeout(() => { this.closeMe.emit() }, 5000);
  }

}
