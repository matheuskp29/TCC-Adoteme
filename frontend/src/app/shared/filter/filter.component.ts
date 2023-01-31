import { ClienteStoreService } from './../core/stores/cliente-store/cliente-store.service';
import { EstadoStoreService } from './../core/stores/estado-store/estado-store.service';
import { AnuncioStoreService } from 'src/app/shared/core/stores/anuncio-store/anuncio-store.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import TipoAnimal from '../core/stores/anuncio-store/tipo-animal';
import Cliente from '../core/stores/cliente-store/cliente';
import PorteAnimal from '../core/stores/anuncio-store/porte-animal';
import Temperamento from '../core/stores/anuncio-store/temperamento';
import { FormGroup, FormControl } from '@angular/forms';
import IdadeAnimal from '../core/stores/anuncio-store/idade-animal';
import Estado from '../core/stores/estado-store/estado';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  public tiposDeAnimal: TipoAnimal[] = [];
  public idadeAnimal: IdadeAnimal[] = [];
  public portes: PorteAnimal[] = [];
  public temperamentos: Temperamento[] = [];
  public estados: Estado[] = [];
  public cliente = new Cliente(null);
  public filtroFavoritado: boolean = false;
  public subscriptions: Subscription[] = [];

  constructor(
    private anuncioService: AnuncioStoreService,
    private clienteStore: ClienteStoreService,
    private estadoStore: EstadoStoreService
  ) {}

  ngOnInit(): void {
    this.initClienteSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public form: FormGroup = new FormGroup({
    tipoAnimal: new FormControl(''),
    idadeAnimal: new FormControl(''),
    porteAnimal: new FormControl(''),
    temperamento: new FormControl(''),
    estado: new FormControl(''),
  });

  get tipoAnimalList$() {
    return this.anuncioService.tipoAnimalList$;
  }

  get idadeAnimalList$() {
    return this.anuncioService.idadeAnimalList$;
  }

  get porteAnimalList$() {
    return this.anuncioService.porteAnimalList$;
  }

  get temperamentoList$() {
    return this.anuncioService.temperamentoList$;
  }

  get estados$() {
    return this.estadoStore.estadoList$;
  }

  getAnunciosFiltrados() {
    this.anuncioService.filtrarAnuncio(
      this.cliente.codigo,
      this.form.get('tipoAnimal')?.value,
      this.form.get('porteAnimal')?.value,
      this.form.get('temperamento')?.value,
      this.form.get('estado')?.value,
      this.form.get('idadeAnimal')?.value,
      false,
      this.filtroFavoritado
    );
  }

  favoritar() {
    this.filtroFavoritado = !this.filtroFavoritado;
  }

  limparFiltros() {
    this.anuncioService.getAnuncios(this.cliente.codigo, false);
    this.form.reset({
      temperamento: '',
      tipoAnimal: '',
      porteAnimal: '',
      idadeAnimal: '',
      estado: '',
    });
    this.filtroFavoritado = false;
  }

  private initClienteSubscription() {
    const clienteSession = sessionStorage.getItem('cliente');
    if (clienteSession) {
      this.cliente = new Cliente(JSON.parse(clienteSession));
    }
  }
}
