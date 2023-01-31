import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnuncioStoreService } from 'src/app/shared/core/stores/anuncio-store/anuncio-store.service';
import { PageEvent } from '@angular/material/paginator';
import Cliente from '../../shared/core/stores/cliente-store/cliente';
import { ClienteStoreService } from '../../shared/core/stores/cliente-store/cliente-store.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss'],
})
export class AnunciosComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  public tam: number = 0;
  lowValue: number = 0;
  highValue: number = 6;

  get anuncios$() {
    return this.anuncioStore.anuncios$;
  }

  constructor(
    private anuncioStore: AnuncioStoreService,
    private clienteStore: ClienteStoreService
  ) {}

  ngOnInit(): void {
    this.initClienteSubscription();
    this.initPaginator();
    this.clienteStore.verificaRoleAdmin();
  }

  initPaginator() {
    this.anuncios$.subscribe((res) => {
      this.tam = res.length;
    });
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  initClienteSubscription() {
    const clienteSession = sessionStorage.getItem('cliente');
    if (clienteSession) {
      const cliente = new Cliente(JSON.parse(clienteSession));
      this.anuncioStore.getAnuncios(cliente.codigo, false);
    } else {
      this.anuncioStore.getAnuncios(null, false);
    }
  }
}
