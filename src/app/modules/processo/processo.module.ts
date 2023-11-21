import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessoRoutingModule } from './processo.route';

import { FormularioProcessoComponent } from './pages/formulario-processo/formulario-processo.component';

@NgModule({
  declarations: [
    FormularioProcessoComponent,
  ],
  imports: [
    CommonModule,
    ProcessoRoutingModule,
  ],
})
export class ProcessoModule { }
