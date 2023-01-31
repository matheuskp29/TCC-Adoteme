import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClienteStoreService } from '../core/stores/cliente-store/cliente-store.service';
import { authStoreService } from '../core/stores/auth-store/auth-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  public nome: string = '';
  public role = this.auth.getRole();

  constructor(
    private clienteStore: ClienteStoreService,
    private auth: authStoreService
  ) {}

  ngOnInit(): void {
    this.initClienteSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  initClienteSubscription() {
    const clienteSession = sessionStorage.getItem('cliente');
    if (clienteSession) {
      this.nome = JSON.parse(clienteSession).nome;
    }
  }

  logout() {
    this.clienteStore.logout();
  }
}
