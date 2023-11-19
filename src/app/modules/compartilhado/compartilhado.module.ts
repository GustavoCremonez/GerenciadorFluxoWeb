import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuNavegacaoComponent } from './components/menu-navegacao/menu-navegacao.component';
import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { RodapeComponent } from './components/rodape/rodape.component';



@NgModule({
  declarations: [
    MenuNavegacaoComponent,
    PaginaNaoEncontradaComponent,
    RodapeComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MenuNavegacaoComponent,
    PaginaNaoEncontradaComponent,
    RodapeComponent
  ]
})
export class CompartilhadoModule { }
