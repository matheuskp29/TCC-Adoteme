import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.scss'],
})
export class ArrowComponent {
  @Input() arrowDirection: 'up' | 'down' = 'down';
  @Input() color: '#f2e46a' | 'white' = 'white';
}
