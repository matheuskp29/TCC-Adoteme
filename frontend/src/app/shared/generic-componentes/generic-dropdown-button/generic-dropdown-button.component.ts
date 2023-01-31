import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-dropdown-button',
  templateUrl: './generic-dropdown-button.component.html',
  styleUrls: ['./generic-dropdown-button.component.scss'],
})
export class GenericDropdownButtonComponent implements OnInit {
  @Input() title: string = '';
  @Input() options: any[] = [];

  arrowColor: '#f2e46a' | 'white' = 'white';
  arrowDirection: 'down' | 'up' = 'down';
  showPanel: boolean = false;
  @Output() selectedOption: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  enableHover() {
    this.arrowColor = '#f2e46a';
  }

  disableHover() {
    this.arrowColor = 'white';
  }

  openCloseOptionsPanel() {
    this.showPanel = !this.showPanel;

    if (this.arrowDirection === 'down') {
      this.arrowDirection = 'up';
    } else {
      this.arrowDirection = 'down';
    }
  }

  emitSelectedOption(option: any) {
    this.selectedOption.emit(option);
    this.disableHover();
  }
}
