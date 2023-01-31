import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClienteStoreService } from 'src/app/shared/core/stores/cliente-store/cliente-store.service';
import Cliente from 'src/app/shared/core/stores/cliente-store/cliente';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { EstadoStoreService } from '../../shared/core/stores/estado-store/estado-store.service';
import Estado from '../../shared/core/stores/estado-store/estado';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  public estados: Estado[] = [];

  form: FormGroup = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    confirmaSenha: new FormControl(''),
    documento: new FormControl(''),
    logradouro: new FormControl(''),
    complemento: new FormControl(''),
    cep: new FormControl(''),
    cidade: new FormControl(''),
    estado: new FormControl(''),
    telefone: new FormControl(''),
    bairro: new FormControl(''),
    senhaDeletar: new FormControl(''),
  });

  myModal: Modal | undefined;
  public cliente = new Cliente(null);

  constructor(
    private formBuilder: FormBuilder,
    private clienteStore: ClienteStoreService,
    private estadoStore: EstadoStoreService
  ) {}

  get estados$() {
    return this.estadoStore.estadoList$;
  }

  ngOnInit(): void {
    this.clienteStore.verificarAutenticacao();
    this.clienteStore.verificaRoleAdmin();
    this.initClienteSubscription();
    if (this.cliente.codigo) {
      this.subscriptions.push(
        this.estadoStore.estadoList$.subscribe((estados) => {
          this.form = new FormGroup({
            nome: new FormControl(this.cliente.nome, [Validators.required]),
            email: new FormControl(this.cliente.email, [
              Validators.required,
              Validators.email,
            ]),
            senha: new FormControl('', [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
            ]),
            confirmaSenha: new FormControl('', [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
            ]),
            documento: new FormControl(this.cliente.documento, [
              Validators.required,
            ]),
            logradouro: new FormControl(this.cliente.logradouro, [
              Validators.required,
            ]),
            complemento: new FormControl(this.cliente.complemento),
            cep: new FormControl(this.cliente.cep, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
            cidade: new FormControl(this.cliente.cidade, [Validators.required]),
            estado: new FormControl(estados[this.cliente.estado - 1].id, [
              Validators.required,
            ]),
            telefone: new FormControl(this.cliente.telefone, [
              Validators.required,
              Validators.minLength(15),
              Validators.maxLength(15),
            ]),
            bairro: new FormControl(this.cliente.bairro, [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100),
            ]),
            senhaDeletar: new FormControl(''),
          });
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private initClienteSubscription() {
    const clienteSession = sessionStorage.getItem('cliente');
    if (clienteSession) {
      this.cliente = new Cliente(JSON.parse(clienteSession));
    }
  }

  alterarConta() {
    this.clienteStore.updateCliente(
      this.cliente.codigo,
      this.form.get('nome')?.value,
      this.form.get('senha')?.value.trim(),
      this.form.get('telefone')?.value.replace(/[^0-9]/g, ''),
      this.form.get('logradouro')?.value,
      this.form.get('complemento')?.value,
      this.form.get('cidade')?.value,
      this.form.get('cep')?.value.replace(/[^0-9]/g, ''),
      this.form.get('estado')?.value,
      this.form.get('bairro')?.value
    );
  }

  deletarConta() {
    this.myModal?.hide();
    this.clienteStore.deleteCliente(
      this.cliente.codigo,
      this.form.get('senhaDeletar')?.value
    );
    this.form.get('senhaDeletar')?.reset();
  }

  openFormModal() {
    this.myModal = new bootstrap.Modal(document.getElementById('#myModal')!, {
      keyboard: false,
      backdrop: 'static',
    });
    this.myModal?.show();
  }

  closeFormModal() {
    this.myModal?.hide();
  }
}
