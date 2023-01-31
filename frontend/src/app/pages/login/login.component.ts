import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClienteStoreService } from 'src/app/shared/core/stores/cliente-store/cliente-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({
    login: new FormControl(''),
    senha: new FormControl('')
  });

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private clienteStore: ClienteStoreService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        login: ['', [Validators.required, Validators.email]],
        senha: ['', Validators.required],
      }
    );
  }

  login() {
    this.clienteStore.autenticarCliente(
      this.form.get('login')?.value,
      this.form.get('senha')?.value,
    )
  }
}
