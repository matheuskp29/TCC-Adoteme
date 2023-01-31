import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { AnunciosComponent } from './pages/anuncios/anuncios.component';
import { MeusAnunciosComponent } from './pages/meus-anuncios/meus-anuncios.component';
import { AnuncioCadastroComponent } from './pages/meus-anuncios/anuncio-cadastro/anuncio-cadastro.component';
import { DetalheAnuncioComponent } from './shared/detalhe-anuncio/detalhe-anuncio.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MeusChatsComponent } from './pages/chat/meus-chats/meus-chats.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';

const routes: Routes = [
  { path: '', redirectTo: '/anuncios', pathMatch: 'full' },
  { path: 'anuncios', component: AnunciosComponent },
  { path: 'detalhe-anuncio/:id', component: DetalheAnuncioComponent },
  { path: 'meus-anuncios', component: MeusAnunciosComponent },
  { path: 'meus-anuncios/cadastro', component: AnuncioCadastroComponent },
  { path: 'meus-anuncios/alterar/:id', component: AnuncioCadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'meus-chats', component: MeusChatsComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'relatorios', component: RelatoriosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
