import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluxoRoutingModule } from './fluxo.route';
import { HttpClientModule } from '@angular/common/http';

import { ListaFluxosComponent } from './pages/lista-fluxos/lista-fluxos.component';
import { CadastroFluxoComponent } from './pages/cadastro-fluxo/cadastro-fluxo.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaFluxosComponent,
    CadastroFluxoComponent
  ],
  imports: [
    CommonModule,
    FluxoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class FluxoModule { }
