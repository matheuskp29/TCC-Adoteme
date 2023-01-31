import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatStoreService } from 'src/app/shared/core/stores/chat-store/chat-store.service';
import Cliente from '../../../shared/core/stores/cliente-store/cliente';
import { ClienteStoreService } from '../../../shared/core/stores/cliente-store/cliente-store.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-meus-chats',
  templateUrl: './meus-chats.component.html',
  styleUrls: ['./meus-chats.component.scss'],
})
export class MeusChatsComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[] = [];
  public tam: number = 0;
  public lowValue: number = 0;
  public highValue: number = 4;

  get chats$() {
    return this.chatStore.chats$;
  }

  constructor(
    private chatStore: ChatStoreService,
    private clienteStore: ClienteStoreService
  ) {}

  ngOnInit(): void {
    this.clienteStore.verificarAutenticacao();
    this.clienteStore.verificaRoleAdmin();
    this.initClienteSubscription();
    this.initPaginator();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  initPaginator() {
    this.chats$.subscribe((res) => {
      this.tam = res.length;
    });
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  initClienteSubscription() {
    const clienteSession = sessionStorage.getItem('cliente');
    if (clienteSession) {
      const cliente = new Cliente(JSON.parse(clienteSession));
      this.chatStore.getChats(cliente.codigo);
    }
  }
}
