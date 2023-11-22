import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ProcessoModel } from 'src/app/models/processo.interface';
import { ProcessoService } from './../../services/processo.service';
import { TipoProcesso } from 'src/app/models/tipo-processo.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-processos',
  templateUrl: './lista-processos.component.html',
  styleUrls: ['./lista-processos.component.scss']
})
export class ListaProcessosComponent implements OnInit, OnDestroy{
  private readonly destroy$: Subject<void> = new Subject();
  idFluxo!: number;
  processos!: ProcessoModel[];
  tituloFluxo!: string;
  tipoProcesso = TipoProcesso

  constructor(
    private route: ActivatedRoute,
    private processoService: ProcessoService,
    private toastr: ToastrService
    ){}

  ngOnInit(): void {
    this.route.params
    .subscribe(params => {
      const id = params['id'];

      if(id) {
        this.buscarProcessos(id);
        this.idFluxo = id;
      }
    });
  }

  buscarProcessos(id: number): void {
    this.processoService
    .getProcessosPorFluxo(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.processos = response.processos;
        this.tituloFluxo = response.tituloFluxo;
      },
      error: (error) => console.log(error)
    });
  }

  deletarProcesso(processo: ProcessoModel): void{
    console.log(processo.subProcessos.length === 0)
    if(processo.subProcessos.length === 0){
      this.processoService
      .delete(processo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () =>{
          this.buscarProcessos(this.idFluxo);
          this.toastr.success('Processo foi removido!', 'Sucesso!');
        },
        error: (error) => {
          console.log(error);
          this.toastr.error('Aconteceu um erro, tente novamente mais tarde!', 'Erro!');
        }
      });
    }
    else{
      this.toastr.warning('Para remover um processo precisa remover todos os sub processos do mesmo!', 'Aviso!');
      this.buscarProcessos(this.idFluxo);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
