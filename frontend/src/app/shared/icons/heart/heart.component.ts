import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heart',
  templateUrl: './heart.component.html',
  styleUrls: ['./heart.component.scss'],
})
export class HeartComponent implements OnInit {
  @Input() selected = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goTomainPage() {
    this.router.navigate(['/anuncios']);
  }
}
