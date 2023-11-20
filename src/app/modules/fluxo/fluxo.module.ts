import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluxoRoutingModule } from './fluxo.route';
import { HttpClientModule } from '@angular/common/http';

import { ListaFluxosComponent } from './pages/lista-fluxos/lista-fluxos.component';
import { FormularioFluxoComponent } from './pages/cadastro-fluxo/formulario-fluxo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaProcessosComponent } from './lista-processos/lista-processos.component';


@NgModule({
  declarations: [
    ListaFluxosComponent,
    FormularioFluxoComponent,
    ListaProcessosComponent
  ],
  imports: [
    CommonModule,
    FluxoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class FluxoModule { }
