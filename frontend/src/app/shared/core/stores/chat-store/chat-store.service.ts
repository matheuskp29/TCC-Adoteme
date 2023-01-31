import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../notification-service/notification.service';
import ChatRequest from './chat-request';
import ChatResponse from './chat-response';
import MensagemRequest from './mensagem-request';
import MensagemResponse from './mensagem-response';
import SelectedChat from './selected-chat';
import ChatFinalizaRequest from './chat-finaliza-request';
import ChatAvailabilityResponse from './chat-availability-response';
import { BASE_URL } from '../../../utils/requests';

@Injectable({
  providedIn: 'root',
})
export class ChatStoreService {
  private mensagensSubject: BehaviorSubject<MensagemResponse[]> =
    new BehaviorSubject<MensagemResponse[]>([]);

  private chatsSubject: BehaviorSubject<ChatResponse[]> = new BehaviorSubject<
    ChatResponse[]
  >([]);

  private selectedChatSubject: BehaviorSubject<SelectedChat | null> =
    new BehaviorSubject<SelectedChat | null>(null);

  get mensagens$() {
    return this.mensagensSubject.asObservable();
  }

  get chats$() {
    return this.chatsSubject.asObservable();
  }

  get selectedChat$() {
    return this.selectedChatSubject.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  getChats(codigoCliente: number | null | undefined) {
    if (codigoCliente) {
      this.httpClient
        .get<ChatResponse[]>(
          `${BASE_URL}chat/chats?codigoCliente=${codigoCliente}`
        )
        .subscribe((chats) => {
          this.chatsSubject.next(chats);
        });
    }
  }

  getMensagens(
    codigoAnuncio: string | number | undefined | null,
    codigoClienteAutenticado: number | undefined | null,
    codigoClienteDestino: number | undefined | null
  ) {
    if (codigoAnuncio && codigoClienteAutenticado && codigoClienteDestino) {
      const model: ChatRequest = {
        codigoAnuncio: codigoAnuncio,
        codigoClienteAutenticado: codigoClienteAutenticado,
        codigoClienteDestino: codigoClienteDestino,
      };

      this.httpClient
        .get<MensagemResponse[]>(
          `${BASE_URL}chat?codigoAnuncio=${model.codigoAnuncio}&codigoClienteAutenticado=${model.codigoClienteAutenticado}&codigoClienteDestino=${model.codigoClienteDestino}`
        )
        .subscribe((response) => {
          this.mensagensSubject.next(response);
          this.router.navigate(['chat', codigoAnuncio]);
        });
    } else {
      this.notificationService.showWarning(
        'Você precisa estar autenticado para executar essa ação',
        'Atenção!'
      );
      this.router.navigate(['login']);
    }
  }

  getStatusChat(chatSelecionado: SelectedChat | null) {
    if (chatSelecionado) {
      const model: ChatRequest = {
        codigoAnuncio: chatSelecionado.anuncioId,
        codigoClienteAutenticado: chatSelecionado.codigoClienteAutenticado,
        codigoClienteDestino: chatSelecionado.codigoClienteDestino,
      };
      this.httpClient
        .post<ChatAvailabilityResponse>(`${BASE_URL}chat/status`, model)
        .subscribe((res) => {
          if (res.status && res.codigo) {
            chatSelecionado.codigoChat = res.codigo;
            chatSelecionado.status = res.status;
            this.setSelectedChat(chatSelecionado);
          }
        });
    }
  }

  enviarMensagem(descricao: string, chatSelecionado: SelectedChat) {
    if (chatSelecionado && descricao) {
      if (descricao.length > 500) {
        this.notificationService.showWarning(
          'A mensagem deve ter até 500 carácteres',
          'Atenção!'
        );
      } else {
        const model: MensagemRequest = {
          codigoCliente: chatSelecionado.codigoClienteAutenticado,
          codigoAnuncio: chatSelecionado.anuncioId,
          descricao: descricao,
          codigoClienteDestino: chatSelecionado.codigoClienteDestino,
        };

        this.httpClient.post(`${BASE_URL}chat`, model).subscribe({
          next: () => {
            this.getMensagens(
              chatSelecionado.anuncioId,
              chatSelecionado.codigoClienteAutenticado,
              chatSelecionado.codigoClienteDestino
            );
            this.getStatusChat(chatSelecionado);
          },
          error: () => {
            this.notificationService.showError(
              'Erro ao enviar a mensagem',
              'Erro!'
            );
          },
        });
      }
    }
  }

  finalizar(codigoChat: number) {
    const model: ChatFinalizaRequest = {
      codigoChat: codigoChat,
    };
    this.httpClient.put(`${BASE_URL}chat/finaliza`, model).subscribe({
      next: () => {
        this.router.navigate(['/anuncios']);
        this.notificationService.showSuccess(
          'Chat finalizado com sucesso',
          'Sucesso!'
        );
      },
      error: () => {
        this.notificationService.showError(
          'Erro ao tentar finalizar o chat',
          'Erro!'
        );
      },
    });
  }

  setSelectedChat(model: SelectedChat) {
    this.selectedChatSubject.next(model);
  }
}
