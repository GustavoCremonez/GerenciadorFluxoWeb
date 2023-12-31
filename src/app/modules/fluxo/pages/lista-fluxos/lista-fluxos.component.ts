import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { FluxoModel } from './../../../../models/fluxo.interface';
import { FluxoService } from './../../services/fluxo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lista-fluxos',
  templateUrl: './lista-fluxos.component.html',
  styleUrls: ['./lista-fluxos.component.scss']
})
export class ListaFluxosComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  fluxos!: FluxoModel[];

  constructor(
    private fluxoService: FluxoService,
    private router: Router,
    private toastr: ToastrService
    ){}

  ngOnInit(): void {
    this.buscarFluxos();
  }

  buscarFluxos(): void{
    this.fluxoService.get()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        (this.fluxos = response);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  removerFluxo(id: number): void{
    this.fluxoService.delete(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.buscarFluxos();
        this.toastr.success('Fluxo removido com sucesso', 'Sucesso!');
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Aconteceu um erro, tente novamente mais tarde!', 'Erro!');
      }
    })
  }

  navegarParaEdicao(id: number): void{
    this.router.navigate([`fluxos/editar-fluxo/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
