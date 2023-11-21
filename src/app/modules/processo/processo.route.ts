import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { ListaProcessosComponent } from "../processo/pages/lista-processos/lista-processos.component";
import { FormularioProcessoComponent } from "./pages/formulario-processo/formulario-processo.component";

const fluxoRouterConfig: Routes = [
  {path: 'lista-processos/:id', component: ListaProcessosComponent},
  {path: 'cadastro-processo/:idFluxo', component: FormularioProcessoComponent},
  {path: 'cadastro-processo/:idFluxo/:idProcessoSuperior', component: FormularioProcessoComponent},
  {path: 'editar-processo/:idFluxo/:id', component: FormularioProcessoComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(fluxoRouterConfig)
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ProcessoRoutingModule{}
