import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AnuncioComponent } from './shared/anuncio/anuncio.component';
import { MatCardModule } from '@angular/material/card';
import { MenuComponent } from './shared/menu/menu.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { IMaskModule } from 'angular-imask';
import { ToastrModule } from 'ngx-toastr';
import { AnunciosComponent } from './pages/anuncios/anuncios.component';
import { HeaderComponent } from './shared/header/header.component';
import { GenericOptionsPanelComponent } from './shared/generic-componentes/generic-options-panel/generic-options-panel.component';
import { MatOptionModule } from '@angular/material/core';
import { GenericDropdownButtonComponent } from './shared/generic-componentes/generic-dropdown-button/generic-dropdown-button.component';
import { ArrowComponent } from './shared/icons/arrow/arrow.component';
import { AnuncioCadastroComponent } from './pages/meus-anuncios/anuncio-cadastro/anuncio-cadastro.component';
import { MeusAnunciosComponent } from './pages/meus-anuncios/meus-anuncios.component';
import { MatSelectModule } from '@angular/material/select';
import { CloseComponent } from './shared/icons/close/close.component';
import { DetalheAnuncioComponent } from './shared/detalhe-anuncio/detalhe-anuncio.component';
import { ConfirmacaoDialogComponent } from './shared/confirmacao-dialog/confirmacao-dialog.component';
import { NoResultsPlaceholderComponent } from './shared/no-results-placeholder/no-results-placeholder.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MensagemComponent } from './pages/chat/mensagem/mensagem.component';
import { MeusChatsComponent } from './pages/chat/meus-chats/meus-chats.component';
import { ChatResumoComponent } from './pages/chat/meus-chats/chat-resumo/chat-resumo.component';
import { FilterComponent } from './shared/filter/filter.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeartComponent } from './shared/icons/heart/heart.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthInterceptor } from './shared/core/helpers/auth.interceptor';
import { SecondHeaderComponent } from './shared/second-header/second-header.component';
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from '@angular/material/paginator';
import { CustomPaginatorConfig } from './shared/paginator/CustomPaginatorConfig';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { MatDividerModule } from '@angular/material/divider';
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AnuncioComponent,
    MenuComponent,
    LoginComponent,
    CadastroComponent,
    PerfilComponent,
    AnunciosComponent,
    GenericOptionsPanelComponent,
    GenericDropdownButtonComponent,
    ArrowComponent,
    AnuncioCadastroComponent,
    MeusAnunciosComponent,
    CloseComponent,
    DetalheAnuncioComponent,
    ConfirmacaoDialogComponent,
    NoResultsPlaceholderComponent,
    ChatComponent,
    MensagemComponent,
    MeusChatsComponent,
    ChatResumoComponent,
    FilterComponent,
    FooterComponent,
    HeartComponent,
    SecondHeaderComponent,
    RelatoriosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    IMaskModule,
    ToastrModule.forRoot(),
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatDividerModule,
    NgApexchartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: CustomPaginatorConfig() },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
