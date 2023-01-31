import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-generic-options-panel',
  templateUrl: './generic-options-panel.component.html',
  styleUrls: ['./generic-options-panel.component.scss']
})
export class GenericOptionsPanelComponent {

  @Input() options: any[] = [];
  @Input() showOptions: boolean = false;

  @Output() optionSelected: EventEmitter<any> = new EventEmitter();


  public emitSelectedOption(option: any) {
    this.optionSelected.emit(option);
  }

}
