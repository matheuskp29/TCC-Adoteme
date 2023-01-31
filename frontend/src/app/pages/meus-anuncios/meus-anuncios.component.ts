import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnuncioStoreService } from 'src/app/shared/core/stores/anuncio-store/anuncio-store.service';
import { ClienteStoreService } from 'src/app/shared/core/stores/cliente-store/cliente-store.service';
import Cliente from "../../shared/core/stores/cliente-store/cliente";

@Component({
  selector: 'app-meus-anuncios',
  templateUrl: './meus-anuncios.component.html',
  styleUrls: ['./meus-anuncios.component.scss'],
})
export class MeusAnunciosComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];

  get anuncios$() {
    return this.anuncioStore.anuncios$;
  }

  constructor(
    private anuncioStore: AnuncioStoreService,
    private clienteStore: ClienteStoreService
  ) {}

  ngOnInit(): void {
    this.clienteStore.verificarAutenticacao();
    this.clienteStore.verificaRoleAdmin();
    this.initClienteSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  initClienteSubscription() {
    const clienteSession = sessionStorage.getItem('cliente');
    if (clienteSession) {
      const cliente = new Cliente(JSON.parse(clienteSession));
      this.anuncioStore.getAnuncios(cliente.codigo, true);
    }
  }
}
