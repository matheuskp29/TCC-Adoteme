import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import ChatResponse from 'src/app/shared/core/stores/chat-store/chat-response';
import { ChatStoreService } from 'src/app/shared/core/stores/chat-store/chat-store.service';
import SelectedChat from 'src/app/shared/core/stores/chat-store/selected-chat';
import Cliente from 'src/app/shared/core/stores/cliente-store/cliente';

@Component({
  selector: 'app-chat-resumo',
  templateUrl: './chat-resumo.component.html',
  styleUrls: ['./chat-resumo.component.scss'],
})
export class ChatResumoComponent implements OnInit, OnDestroy {
  @Input() chat: ChatResponse | null = null;
  public subscriptions: Subscription[] = [];
  public cliente: Cliente | null = null;

  constructor(
    private router: Router,
    private chatStore: ChatStoreService,
  ) {}

  ngOnInit(): void {
    this.initClienteSubscription();
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

  selecionarChat() {
    this.chatStore.setSelectedChat({
      anuncioId: this.chat?.codigoAnuncio,
      tituloAnuncio: this.chat?.tituloAnuncio,
      nomeClienteAnuncio: this.chat?.nomeClienteAnuncio,
      nomeClienteInteressado: this.chat?.nomeClienteInteressado,
      codigoClienteAutenticado: this.chat?.codigoClienteAutenticado,
      codigoClienteDestino: this.chat?.codigoClienteDestino,
      codigoChat: this.chat?.codigoChat,
      status: this.chat?.status,
    } as SelectedChat);
    this.router.navigate(['chat', this.chat?.codigoAnuncio]);
  }
}
