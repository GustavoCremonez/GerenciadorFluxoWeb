import { FluxoModel } from 'src/app/models/fluxo.interface';
import { FluxoService } from './../../services/fluxo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-lista-fluxos',
  templateUrl: './lista-fluxos.component.html',
  styleUrls: ['./lista-fluxos.component.scss']
})
export class ListaFluxosComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  fluxos!: FluxoModel[];

  constructor(private fluxoService: FluxoService ){}

  ngOnInit(): void {
    this.buscarFluxos();
  }

  buscarFluxos(): void{
    this.fluxoService.buscarFluxos()
    // .pipe(takeUntil(this.destroy$))
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
    this.fluxoService.removerFluxo(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.buscarFluxos();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
