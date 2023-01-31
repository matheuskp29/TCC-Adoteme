import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import Anuncio from 'src/app/shared/core/stores/anuncio-store/anuncio';
import { NotificationService } from '../notification-service/notification.service';
import AnuncioAlteracaoRequest from './anuncio-alteracao-request';
import AnuncioRequest from './anuncio-cadastro-request';
import AnuncioDetalhe from './anuncio-detalhe';
import FavoritoRequest from './favorito-request';
import IdadeAnimal from './idade-animal';
import PorteAnimal from './porte-animal';
import Temperamento from './temperamento';
import TipoAnimal from './tipo-animal';
import { BASE_URL } from '../../../utils/requests';

@Injectable({
  providedIn: 'root',
})
export class AnuncioStoreService {
  private anunciosSubject: BehaviorSubject<Anuncio[]> = new BehaviorSubject<
    Anuncio[]
  >([]);
  private tipoAnimalSubject: BehaviorSubject<TipoAnimal[]> =
    new BehaviorSubject<TipoAnimal[]>([]);
  private idadeAnimalSubject: BehaviorSubject<IdadeAnimal[]> =
    new BehaviorSubject<IdadeAnimal[]>([]);
  private porteAnimalSubject: BehaviorSubject<PorteAnimal[]> =
    new BehaviorSubject<PorteAnimal[]>([]);
  private temperamentoSubject: BehaviorSubject<Temperamento[]> =
    new BehaviorSubject<Temperamento[]>([]);
  private selectedAnuncioSubject: BehaviorSubject<AnuncioDetalhe | null> =
    new BehaviorSubject<AnuncioDetalhe | null>(null);

  get anuncios$() {
    return this.anunciosSubject.asObservable();
  }

  get selectedAnuncio$() {
    return this.selectedAnuncioSubject.asObservable();
  }

  get tipoAnimalList$() {
    return this.tipoAnimalSubject.asObservable();
  }

  get idadeAnimalList$() {
    return this.idadeAnimalSubject.asObservable();
  }

  get porteAnimalList$() {
    return this.porteAnimalSubject.asObservable();
  }

  get temperamentoList$() {
    return this.temperamentoSubject.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.getTipoAnimalList();
    this.getIdadeAnimalList();
    this.getPorteAnimalList();
    this.getTemperamentoList();
  }

  public setSelectedAnuncio(id: string, idCliente: number | null) {
    if (idCliente) {
      this.httpClient
        .get<AnuncioDetalhe>(`${BASE_URL}anuncio/${id}?idCliente=${idCliente}`)
        .subscribe((response) => {
          this.selectedAnuncioSubject.next(response);
        });
    } else {
      this.httpClient
        .get<AnuncioDetalhe>(`${BASE_URL}anuncio/${id}`)
        .subscribe((response) => {
          this.selectedAnuncioSubject.next(response);
        });
    }
  }

  public resetSelectedAnuncio() {
    this.selectedAnuncioSubject.next(null);
  }

  public getAnuncios(clienteId: number | null, meusAnuncios: boolean) {
    if (clienteId) {
      this.httpClient
        .get<Anuncio[]>(
          `${BASE_URL}anuncio?idCliente=${clienteId}&meusAnuncios=${meusAnuncios}&favoritos=${false}`
        )
        .subscribe((response) => {
          this.anunciosSubject.next(response);
        });
    } else {
      this.httpClient
        .get<Anuncio[]>(
          `${BASE_URL}anuncio?meusAnuncios=${meusAnuncios}&favoritos=${false}`
        )
        .subscribe((response) => {
          this.anunciosSubject.next(response);
        });
    }
  }

  private getTipoAnimalList() {
    this.httpClient
      .get<TipoAnimal[]>(`${BASE_URL}tipo`)
      .subscribe((response) => {
        this.tipoAnimalSubject.next(response);
      });
  }

  private getIdadeAnimalList() {
    this.httpClient
      .get<IdadeAnimal[]>(`${BASE_URL}idade`)
      .subscribe((response) => {
        this.idadeAnimalSubject.next(response);
      });
  }

  private getPorteAnimalList() {
    this.httpClient
      .get<PorteAnimal[]>(`${BASE_URL}porte`)
      .subscribe((response) => {
        this.porteAnimalSubject.next(response);
      });
  }

  private getTemperamentoList() {
    this.httpClient
      .get<Temperamento[]>(`${BASE_URL}temperamento`)
      .subscribe((response) => {
        this.temperamentoSubject.next(response);
      });
  }

  public criarAnuncio(model: AnuncioRequest, foto: File | null) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    let json = JSON.stringify(model);
    let blob = new Blob([json], { type: 'application/json' });

    let formData = new FormData();
    formData.append('request', blob);
    if (foto) formData.append('foto', foto);
    this.httpClient
      .post(`${BASE_URL}anuncio/save`, formData, {
        headers: headers,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/meus-anuncios']);
          this.notificationService.showSuccess(
            'Anúncio cadastrado com sucesso',
            'Sucesso!'
          );
        },
        error: () =>
          this.notificationService.showError(
            'Não foi possível cadastrar o anúncio',
            'Erro!'
          ),
      });
  }

  public alterarAnuncio(model: AnuncioAlteracaoRequest, foto: File | null) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    let json = JSON.stringify(model);
    let blob = new Blob([json], { type: 'application/json' });

    let formData = new FormData();
    formData.append('request', blob);
    if (foto) formData.append('foto', foto);

    this.httpClient
      .put(`${BASE_URL}anuncio/update/${model.id}`, formData, {
        headers: headers,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['detalhe-anuncio', model.id]);
          this.notificationService.showSuccess(
            'Anúncio alterado com sucesso',
            'Sucesso!'
          );
        },
        error: () =>
          this.notificationService.showError(
            'Não foi possível alterar o anúncio',
            'Erro!'
          ),
      });
  }

  public deletarAnuncio(id: string) {
    this.httpClient.delete(`${BASE_URL}anuncio/delete/${id}`).subscribe({
      next: () => {
        this.router.navigate(['meus-anuncios']);
        this.notificationService.showSuccess(
          'Anúncio excluído com sucesso',
          'Sucesso!'
        );
      },
      error: () =>
        this.notificationService.showError(
          'Não foi possível excluir o anúncio',
          'Erro!'
        ),
    });
  }

  public filtrarAnuncio(
    idCliente: number,
    tipoAnimal: number,
    porte: number,
    temperamento: number,
    estado: number,
    idade: number,
    meusAnuncios: boolean,
    favoritos: boolean
  ) {
    let url = `${BASE_URL}anuncio?idCliente=${idCliente}&meusAnuncios=${meusAnuncios}&favoritos=${favoritos}`;
    if (tipoAnimal) url = url + `&tipoAnimal=${tipoAnimal}`;
    if (porte) url = url + `&porte=${porte}`;
    if (temperamento) url = url + `&temperamento=${temperamento}`;
    if (estado) url = url + `&estado=${estado}`;
    if (idade) url = url + `&idade=${idade}`;

    this.httpClient.get<Anuncio[]>(url).subscribe({
      next: (response) => {
        this.anunciosSubject.next(response);
        this.notificationService.showSuccess(
          'Pesquisa realizada com sucesso',
          'Sucesso'
        );
      },
      error: () =>
        this.notificationService.showError(
          'Não existe anúncios com esse(s) filtro(s) ',
          'Erro!'
        ),
    });
  }

  favoritarAnuncio(codigoCliente: number, codigoAnuncio: number | string) {
    if (!codigoCliente) {
      this.notificationService.showWarning(
        'Você precisa estar autenticado para executar essa ação',
        'Atenção!'
      );
      this.router.navigate(['login']);
      return;
    }

    const request: FavoritoRequest = {
      codigoCliente,
      codigoAnuncio,
    };

    this.httpClient.post(`${BASE_URL}favorito`, request).subscribe({
      next: () => {},
      error: () => {
        this.notificationService.showError(
          'Não foi possível favoritar o anúncio',
          'Erro!'
        );
      },
    });
  }
}
