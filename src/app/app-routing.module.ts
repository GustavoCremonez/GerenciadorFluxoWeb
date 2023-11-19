import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './modules/compartilhado/components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'home', component: AppComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
