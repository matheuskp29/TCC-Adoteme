import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClienteStoreService } from '../core/stores/cliente-store/cliente-store.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-second-header',
  templateUrl: './second-header.component.html',
  styleUrls: ['./second-header.component.scss'],
})
export class SecondHeaderComponent implements OnInit, OnDestroy {
  public filtro = new FormControl();
  public nome: string = '';
  public subscriptions: Subscription[] = [];
  public role: string = '';

  constructor(private clienteStore: ClienteStoreService, private router: Router) {}

  ngOnInit(): void {
    this.initClienteSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  initClienteSubscription() {
    const clienteSession = sessionStorage.getItem('cliente');
    const roleSession = sessionStorage.getItem('auth-role');
    if (clienteSession) {
      this.nome = JSON.parse(clienteSession).nome.split(" ")[0];
    }
    if (roleSession) {
      this.role = roleSession;
    }
  }

  redirecionaTela() {
    if (this.role !== 'ROLE_ADMIN') {
      this.router.navigate(['/anuncios']);
    }
  }

  logout() {
    this.clienteStore.logout();
  }
}
