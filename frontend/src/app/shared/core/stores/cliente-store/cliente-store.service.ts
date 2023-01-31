import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../notification-service/notification.service';
import Cliente from './cliente';
import DeleteClienteRequest from "./deleteClienteRequest";
import LoginRequest from "./loginRequest";
import LoginResponse from "./loginResponse";
import {authStoreService} from "../auth-store/auth-store.service";
import CreateClienteRequest from "./createClienteRequest";
import UpdateClienteRequest from "./updateClienteRequest";
import {BASE_URL} from "../../../utils/requests";

@Injectable({
  providedIn: 'root',
})
export class ClienteStoreService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
    private authStore: authStoreService
  ) {
  }

  public createCliente(
    nome: string,
    email: string,
    senha: string,
    documento: string,
    logradouro: string,
    complemento: string,
    cep: string,
    bairro: string,
    cidade: string,
    estado: number,
    telefone: string
  ) {
    const model: CreateClienteRequest = {
      nome: nome,
      email: email,
      senha: senha,
      documento: documento,
      logradouro: logradouro,
      complemento: complemento,
      cep: cep,
      bairro: bairro,
      cidade: cidade,
      estado: estado,
      telefone: telefone
    }
    this.httpClient
      .post(
        `${BASE_URL}cliente`,
        model
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.notificationService.showSuccess(
            'Usuário cadastrado com sucesso',
            'Sucesso!'
          );
        },
        error: () =>
          this.notificationService.showError(
            'Não foi possível cadastrar usuário',
            'Erro!'
          ),
      });
  }

  public autenticarCliente(email: string, senha: string) {
    if (email && senha) {
      const model: LoginRequest = {
        email: email,
        senha: senha
      }
      this.httpClient
        .post<LoginResponse>(
          `${BASE_URL}cliente/autenticar`, model
        )
        .subscribe({
          next: (res) => {
            this.authStore.saveTokenRole(res.token, res.role)
            window.sessionStorage.setItem('user_email', res.cliente.email);
            window.sessionStorage.setItem('cliente', JSON.stringify(res.cliente));
            res.role === "ROLE_ADMIN" ? this.router.navigate(['/relatorios']) : this.router.navigate(['/anuncios']);
            this.notificationService.showSuccess(
              'Usuário autenticado com sucesso',
              'Sucesso!'
            );
          },
          error: () =>
            this.notificationService.showWarning(
              'Não foi possível efetuar o login, email ou senha inválidos!',
              'Erro!'
            ),
        });
    }

  }

  public updateCliente(
    codigo: number,
    nome: string,
    senha: string,
    telefone: string,
    logradouro: string,
    complemento: string,
    cidade: string,
    cep: string,
    estado: number,
    bairro: string
  ) {
    const model: UpdateClienteRequest = {
      codigo: codigo,
      nome: nome,
      senha: senha,
      telefone: telefone,
      logradouro: logradouro,
      complemento: complemento,
      cidade: cidade,
      cep: cep,
      bairro: bairro,
      estado: estado
    }
    this.httpClient
      .put<Cliente>(
        `${BASE_URL}cliente`,
        model
      )
      .subscribe({
        next: (cliente) => {
          sessionStorage.setItem('cliente', JSON.stringify(cliente));
          this.router.navigate(['/anuncios']);
          this.notificationService.showSuccess(
            'Cadastro atualizado com sucesso!',
            'Sucesso!'
          );
        },
        error: () =>
          this.notificationService.showError(
            'Não foi possível atualizar o cadastro',
            'Erro!'
          ),
      });
  }

  public deleteCliente(codigo: number, senha: string) {
    if (codigo && senha) {
      const model: DeleteClienteRequest = {
        codigo: codigo,
        senha: senha
      }
      this.httpClient
        .delete(`${BASE_URL}cliente/`, {
          body: model
        })
        .subscribe({
          next: () => {
            this.logout();
            this.notificationService.showSuccess(
              'Cadastro deletado com sucesso',
              'Sucesso!'
            );
          },
          error: () =>
            this.notificationService.showError(
              'Não foi possível deletar o seu cadastro',
              'Erro!'
            ),
        });
    }
  }

  public logout() {
    this.authStore.signOut();
    this.router.navigate(['/login']);
  }

  public verificarAutenticacao() {
    if (!sessionStorage.getItem('auth-token')) {
      this.router.navigate(['/login']);
      this.notificationService.showWarning(
        'Você deve estar autenticado para acessar essa funcionalidade',
        'Atenção!'
      );
    }
  }

  public verificarAdmin() {
    const roleSession = this.authStore.getRole();
    if (roleSession && roleSession !== 'ROLE_ADMIN') {
      this.router.navigate(['/login']);
      this.notificationService.showWarning(
        'Você deve ser admin para acessar essa funcionalidade',
        'Atenção!'
      );
    }
  }

  public verificaRoleAdmin() {
    const roleSession = this.authStore.getRole();
    if (roleSession && roleSession === 'ROLE_ADMIN') {
      this.router.navigate(['/relatorios']);
      this.notificationService.showWarning(
        'Admin só pode acessar a área de relatórios',
        'Atenção!'
      )
    }
  }
}
