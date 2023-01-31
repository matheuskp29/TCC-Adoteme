import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteStoreService } from 'src/app/shared/core/stores/cliente-store/cliente-store.service';
import { EstadoStoreService } from "../../shared/core/stores/estado-store/estado-store.service";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  get estadoList$() {
    return this.estadoStore.estadoList$;
  }

  error: boolean = false;
  form: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(100)]),
    senha: new FormControl('', [Validators.required,  Validators.minLength(6), Validators.maxLength(20)]),
    confirmaSenha: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    documento: new FormControl('', Validators.required),
    logradouro: new FormControl('', Validators.required),
    complemento: new FormControl(''),
    cep: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    bairro: new FormControl('', [Validators.required,  Validators.minLength(3), Validators.maxLength(100)]),
    cidade: new FormControl('', Validators.required),
    estados: new FormControl('', Validators.required),
    telefone: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
  });

  constructor(private formBuilder: FormBuilder, private clienteStore: ClienteStoreService, private estadoStore: EstadoStoreService) { }

  ngOnInit(): void {
  }

  cadastrar() {
    this.clienteStore.createCliente(
      this.form.get('nome')?.value,
      this.form.get('email')?.value,
      this.form.get('senha')?.value,
      this.form.get('documento')?.value.replace(/[^0-9]/g, ''),
      this.form.get('logradouro')?.value,
      this.form.get('complemento')?.value,
      this.form.get('cep')?.value.replace(/[^0-9]/g, ''),
      this.form.get('bairro')?.value,
      this.form.get('cidade')?.value,
      this.form.get('estados')?.value,
      this.form.get('telefone')?.value.replace(/[^0-9]/g, ''))
  }
}
