import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListaFluxosComponent } from "./pages/lista-fluxos/lista-fluxos.component";
import { FormularioFluxoComponent } from "./pages/cadastro-fluxo/formulario-fluxo.component";

const fluxoRouterConfig: Routes = [
  {path: 'lista-fluxos', component: ListaFluxosComponent},
  {path: 'cadastro-fluxo', component: FormularioFluxoComponent},
  {path: 'editar-fluxo/:id', component: FormularioFluxoComponent},
  {path: '', redirectTo: 'lista-fluxos', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(fluxoRouterConfig)
  ],
  exports: [RouterModule]
})
export class FluxoRoutingModule{}
