import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ProcessoModel } from 'src/app/models/processo.interface';
import { ProcessoService } from './../../services/processo.service';
import { TipoProcesso } from 'src/app/models/tipo-processo.interface';

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
    private processoService: ProcessoService
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

  deletarProcesso(id: number): void{
    this.processoService
    .delete(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => this.buscarProcessos(this.idFluxo),
      error: (error) => console.log(error)
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
