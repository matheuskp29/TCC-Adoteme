import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import AnuncioAlteracaoRequest from 'src/app/shared/core/stores/anuncio-store/anuncio-alteracao-request';
import AnuncioRequest from 'src/app/shared/core/stores/anuncio-store/anuncio-cadastro-request';
import {AnuncioStoreService} from 'src/app/shared/core/stores/anuncio-store/anuncio-store.service';
import IdadeAnimal from 'src/app/shared/core/stores/anuncio-store/idade-animal';
import PorteAnimal from 'src/app/shared/core/stores/anuncio-store/porte-animal';
import Temperamento from 'src/app/shared/core/stores/anuncio-store/temperamento';
import TipoAnimal from 'src/app/shared/core/stores/anuncio-store/tipo-animal';
import Cliente from 'src/app/shared/core/stores/cliente-store/cliente';
import {NotificationService} from '../../../shared/core/stores/notification-service/notification.service';
import {ClienteStoreService} from "../../../shared/core/stores/cliente-store/cliente-store.service";

@Component({
  selector: 'app-anuncio-cadastro',
  templateUrl: './anuncio-cadastro.component.html',
  styleUrls: ['./anuncio-cadastro.component.scss'],
})
export class AnuncioCadastroComponent implements OnInit, OnDestroy {
  public cliente: Cliente = new Cliente(null);
  public file: File[] = [];
  public tiposDeAnimal: TipoAnimal[] = [];
  public idadeAnimal: IdadeAnimal[] = [];
  public portes: PorteAnimal[] = [];
  public temperamentos: Temperamento[] = [];
  public tituloBotaoVerde: string = this.route.snapshot.paramMap.get('id')
    ? 'Alterar'
    : 'Cadastrar';
  public subscriptions: Subscription[] = [];

  public form: FormGroup = new FormGroup({
    titulo: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]),
    descricao: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(500),
    ]),
    tipoAnimal: new FormControl(0, [Validators.required, Validators.min(1)]),
    idadeAnimal: new FormControl(0, [Validators.required, Validators.min(1)]),
    porteAnimal: new FormControl(0, [Validators.required, Validators.min(1)]),
    temperamento: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  get tipoAnimalList$() {
    return this.anuncioStore.tipoAnimalList$;
  }

  get idadeAnimalList$() {
    return this.anuncioStore.idadeAnimalList$;
  }

  get porteAnimalList$() {
    return this.anuncioStore.porteAnimalList$;
  }

  get temperamentoList$() {
    return this.anuncioStore.temperamentoList$;
  }

  constructor(
    private anuncioStore: AnuncioStoreService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private clienteStore: ClienteStoreService
  ) {
  }

  ngOnDestroy(): void {
    this.anuncioStore.resetSelectedAnuncio();
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.clienteStore.verificarAutenticacao();
    this.clienteStore.verificaRoleAdmin();
    this.initClienteSubscription();
    this.preencherDadosAlteracao();
    this.subscriptions.push(
      this.route.url.subscribe((res) => {
        if (res.toString() === 'meus-anuncios,cadastro') {
          this.form.reset();
        }
      })
    );
  }

  initClienteSubscription() {
    const clienteSession = sessionStorage.getItem('cliente');
    if (clienteSession) {
      this.cliente = new Cliente(JSON.parse(clienteSession));
    }
  }

  preencherDadosAlteracao() {
    this.subscriptions.push(
      this.anuncioStore.selectedAnuncio$.subscribe((selectedAnuncio) => {
        this.form = new FormGroup({
          titulo: new FormControl(selectedAnuncio?.tituloAnuncio, [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100),
          ]),
          descricao: new FormControl(selectedAnuncio?.descricao, [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(500),
          ]),
          tipoAnimal: new FormControl(selectedAnuncio?.idTipoAnimal, [
            Validators.required,
            Validators.min(1),
          ]),
          idadeAnimal: new FormControl(selectedAnuncio?.idIdade, [
            Validators.required,
            Validators.min(1),
          ]),
          porteAnimal: new FormControl(selectedAnuncio?.idPorte, [
            Validators.required,
            Validators.min(1),
          ]),
          temperamento: new FormControl(selectedAnuncio?.idTemperamento, [
            Validators.required,
            Validators.min(1),
          ]),
        });
      })
    );
  }

  uploadFile(event: any) {
    if (this.file.length > 0) {
      this.file = [];
    }

    if (event.target.files[0]) {
      this.file.push(event.target.files[0]);
    }
  }

  deleteFile() {
    this.file = [];
  }

  validaFile(nome: string) {
    const extensao = nome.split('.');
    if (
      extensao[extensao.length - 1].includes('jpg') ||
      extensao[extensao.length - 1].includes('jpeg') ||
      extensao[extensao.length - 1].includes('png')
    ) {
      return true;
    }
    this.notificationService.showWarning(
      'Extensão do arquivo deve ser jpeg, jpg ou png',
      'Erro!'
    );
    return false;
  }

  validaTamanho(file: File) {
    if (file.size > 1000000) {
      this.notificationService.showWarning(
        'Tamanho do arquivo deve ser menor que 10mb',
        'Erro!'
      );
      return false;
    }
    return true;
  }

  cadastrarAnuncio() {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      const model: AnuncioAlteracaoRequest = {
        id: id,
        titulo: this.form.get('titulo')?.value,
        descritivo: this.form.get('descricao')?.value,
        idTipoAnimal: this.form.get('tipoAnimal')?.value,
        idIdade: this.form.get('idadeAnimal')?.value,
        idPorte: this.form.get('porteAnimal')?.value,
        idTemperamento: this.form.get('temperamento')?.value,
      };
      if (this.file[0] && this.validaTamanho(this.file[0])) {
        if (this.validaFile(this.file[0].name.toString())) {
          this.anuncioStore.alterarAnuncio(model, this.file[0]);
        }
      } else if (!this.file[0]) {
        this.anuncioStore.alterarAnuncio(model, null);
      }
    } else {
      const model: AnuncioRequest = {
        titulo: this.form.get('titulo')?.value,
        descricao: this.form.get('descricao')?.value,
        idTipoAnimal: this.form.get('tipoAnimal')?.value,
        idIdade: this.form.get('idadeAnimal')?.value,
        idPorte: this.form.get('porteAnimal')?.value,
        idTemperamento: this.form.get('temperamento')?.value,
        emailCliente: this.cliente.email,
      };
      if (this.file[0] && this.validaTamanho(this.file[0])) {
        if (this.validaFile(this.file[0].name.toString())) {
          this.anuncioStore.criarAnuncio(model, this.file[0]);
        }
      } else if (this.file.length === 0) {
        this.anuncioStore.criarAnuncio(model, null);
      }
    }
  }
}
