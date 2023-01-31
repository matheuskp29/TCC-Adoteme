import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss']
})
export class MensagemComponent implements OnInit {

  @Input() cor: 'purple' | 'green' = 'purple';
  @Input() texto: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
