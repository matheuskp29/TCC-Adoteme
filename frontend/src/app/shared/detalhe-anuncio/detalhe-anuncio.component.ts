import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';
import AnuncioDetalhe from '../core/stores/anuncio-store/anuncio-detalhe';
import { AnuncioStoreService } from '../core/stores/anuncio-store/anuncio-store.service';
import { ChatStoreService } from '../core/stores/chat-store/chat-store.service';
import SelectedChat from '../core/stores/chat-store/selected-chat';
import Cliente from '../core/stores/cliente-store/cliente';
import { ClienteStoreService } from '../core/stores/cliente-store/cliente-store.service';
import {NotificationService} from "../core/stores/notification-service/notification.service";

@Component({
  selector: 'app-detalhe-anuncio',
  templateUrl: './detalhe-anuncio.component.html',
  styleUrls: ['./detalhe-anuncio.component.scss'],
})
export class DetalheAnuncioComponent implements OnInit, OnDestroy {
  public anuncioId: string | null = '';
  public anuncio: AnuncioDetalhe | null = null;
  public cliente: Cliente | null = null;
  public anuncioFavoritado: boolean = false;
  public subscriptions: Subscription[] = [];

  constructor(
    private anuncioStore: AnuncioStoreService,
    private clienteStore: ClienteStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private chatStore: ChatStoreService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initSelectedAnuncioSubscription();
    this.clienteStore.verificaRoleAdmin();
    this.initClienteSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getDetalhesAnuncio() {
    this.anuncioId = this.route.snapshot.paramMap.get('id');
    if (this.anuncioId) {
      if (this.cliente) {
        this.anuncioStore.setSelectedAnuncio(
          this.anuncioId,
          this.cliente.codigo
        );
      } else {
        this.anuncioStore.setSelectedAnuncio(this.anuncioId, null);
      }
    }
  }

  initClienteSubscription() {
    const clienteSession = sessionStorage.getItem('cliente');
    if (clienteSession) {
      this.cliente = new Cliente(JSON.parse(clienteSession));
    }
    this.getDetalhesAnuncio();
  }

  initSelectedAnuncioSubscription() {
    this.subscriptions.push(
      this.anuncioStore.selectedAnuncio$.subscribe((selectedAnuncio) => {
        this.anuncio = selectedAnuncio;
        selectedAnuncio?.codigoFavorito
          ? (this.anuncioFavoritado = true)
          : (this.anuncioFavoritado = false);
      })
    );
  }

  alterarAnuncio() {
    this.router.navigate(['meus-anuncios/alterar', this.anuncioId]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      data: { titulo: 'Tem certeza que deseja excluir o anúncio?' },
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((confirmado) => {
        if (confirmado && this.anuncioId)
          this.anuncioStore.deletarAnuncio(this.anuncioId);
      })
    );
  }

  openChat() {
    this.chatStore.setSelectedChat({
      anuncioId: this.anuncioId,
      tituloAnuncio: this.anuncio?.tituloAnuncio,
      nomeClienteAnuncio: this.anuncio?.clienteNome,
      codigoClienteAutenticado: this.cliente?.codigo,
      codigoClienteDestino: this.anuncio?.clienteId,
      nomeClienteInteressado: this.cliente?.nome
    } as SelectedChat);
    this.router.navigate(['chat', this.anuncioId]);
  }

  favoritarAnuncio() {
    if (this.anuncioId && this.cliente) {
      this.anuncioStore.favoritarAnuncio(this.cliente.codigo, this.anuncioId);
    }
    if (!this.cliente) {
      this.router.navigate(['/login']);
      this.notificationService.showWarning(
        'Você precisa estar autenticado para executar essa ação!',
        'Atenção!'
      )
    } else {
      this.anuncioFavoritado = !this.anuncioFavoritado;
    }
  }
}
