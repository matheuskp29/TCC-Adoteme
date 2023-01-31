import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatStoreService } from 'src/app/shared/core/stores/chat-store/chat-store.service';
import SelectedChat from 'src/app/shared/core/stores/chat-store/selected-chat';
import {ClienteStoreService} from "../../shared/core/stores/cliente-store/cliente-store.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public selectedChat: SelectedChat | null = null;
  public interval: any = null;
  public subscriptions: Subscription[] = [];

  public form: FormGroup = new FormGroup({
    mensagem: new FormControl(''),
  });

  get mensagens$() {
    return this.chatStore.mensagens$;
  }

  constructor(
    private chatStore: ChatStoreService,
    private formBuilder: FormBuilder,
    private clienteStore: ClienteStoreService
  ) {}

  ngOnInit(): void {
    this.clienteStore.verificarAutenticacao();
    this.clienteStore.verificaRoleAdmin();
    this.initSelectedChatSubscription();
    this.chatStore.getStatusChat(this.selectedChat);
    this.initSelectedChatSubscription();
    this.initForm();
    this.updateMensagens();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  initSelectedChatSubscription() {
    this.subscriptions.push(
      this.chatStore.selectedChat$.subscribe((selectedChat) => {
        if (selectedChat) {
          this.selectedChat = selectedChat;
          this.chatStore.getMensagens(
            selectedChat?.anuncioId,
            selectedChat?.codigoClienteAutenticado,
            selectedChat?.codigoClienteDestino
          );
        }
      })
    );
  }

  initForm() {
    this.form = this.formBuilder.group({
      mensagem: [undefined, [Validators.required]],
    });
  }

  finalizarChat() {
    if (this.selectedChat) {
      this.chatStore.finalizar(this.selectedChat.codigoChat);
    }
  }

  enviarMensagem() {
    if (
      this.selectedChat?.codigoClienteAutenticado &&
      this.selectedChat.anuncioId &&
      this.form.get('mensagem')?.value &&
      this.selectedChat?.codigoClienteDestino
    ) {
      this.chatStore.enviarMensagem(
        this.form.get('mensagem')?.value,
        this.selectedChat
      );
      this.initSelectedChatSubscription();
      this.form.reset();
    }
  }

  updateMensagens() {
    this.interval = setInterval(() => {
      if (this.selectedChat) {
        this.chatStore.getMensagens(
          this.selectedChat?.anuncioId,
          this.selectedChat?.codigoClienteAutenticado,
          this.selectedChat?.codigoClienteDestino
        );
      }
    }, 10000);
  }
}
