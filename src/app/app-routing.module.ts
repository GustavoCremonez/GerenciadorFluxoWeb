import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './modules/compartilhado/components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'fluxos',
    loadChildren: () => import('./modules/fluxo/fluxo.module').then(m => m.FluxoModule)
  },
  {path: '', redirectTo: 'fluxos', pathMatch: 'full'},
  {
    path: 'processos',
    loadChildren: () => import('./modules/processo/processo.module').then(m => m.ProcessoModule)
  },
  {path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent},
  {path: '**', redirectTo: 'pagina-nao-encontrada', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
