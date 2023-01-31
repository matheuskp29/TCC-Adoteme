import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Anuncio from '../core/stores/anuncio-store/anuncio';
import { AnuncioStoreService } from '../core/stores/anuncio-store/anuncio-store.service';
import Cliente from '../core/stores/cliente-store/cliente';
import {ClienteStoreService} from "../core/stores/cliente-store/cliente-store.service";

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss'],
})
export class AnuncioComponent implements OnInit, OnDestroy {
  @Input() anuncio: Anuncio = new Anuncio();
  public cliente: Cliente = new Cliente(null);
  public anuncioFavoritado = false;
  public subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private anuncioStore: AnuncioStoreService,
    private clienteStore: ClienteStoreService
  ) {}

  ngOnInit(): void {
    this.initClienteSubscription();
    this.getFavorito();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  initClienteSubscription() {
    const clienteSession = sessionStorage.getItem('cliente');
    if (clienteSession) {
      this.cliente = new Cliente(JSON.parse(clienteSession));
    }
  }

  selecionarAnuncio() {
    this.router.navigate(['detalhe-anuncio', this.anuncio.id]);
  }

  favoritarAnuncio(event: any) {
    this.clienteStore.verificarAutenticacao();
    event.stopPropagation();
    this.anuncioStore.favoritarAnuncio(this.cliente.codigo, this.anuncio.id);
    this.anuncioFavoritado = !this.anuncioFavoritado;
  }

  getFavorito() {
    if (this.anuncio.codigoFavorito) {
      this.anuncioFavoritado = true;
    }
  }
}
