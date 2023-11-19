import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListaFluxosComponent } from "./pages/lista-fluxos/lista-fluxos.component";
import { CadastroFluxoComponent } from "./pages/cadastro-fluxo/cadastro-fluxo.component";

const fluxoRouterConfig: Routes = [
  {path: 'lista-fluxos', component: ListaFluxosComponent},
  {path: 'cadastro-fluxo', component: CadastroFluxoComponent},
  {path: '', redirectTo: 'lista-fluxos', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(fluxoRouterConfig)
  ],
  exports: [RouterModule]
})
export class FluxoRoutingModule{}


