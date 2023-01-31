import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnunciosOptions } from './anuncios-options';
import {authStoreService} from "../core/stores/auth-store/auth-store.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  anunciosOptions: AnunciosOptions[] = [
    {id: 1, descricao: 'Anúncios'},
    {id: 2, descricao: 'Meus Anúncios'}
  ]

  public role: string|null = this.auth.getRole();

  constructor(private router: Router, private auth: authStoreService) { }

  ngOnInit(): void {
  }

  getSelectedOption(option: any) {
    if (option.id === this.anunciosOptions[0].id) {
      this.router.navigate(['/anuncios']);
    }

    if (option.id === this.anunciosOptions[1].id) {
      this.router.navigate(['/meus-anuncios']);
    }
  }
}
