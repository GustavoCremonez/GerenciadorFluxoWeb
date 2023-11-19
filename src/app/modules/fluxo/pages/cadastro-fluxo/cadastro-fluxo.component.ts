import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

import { FluxoService } from './../../services/fluxo.service';

@Component({
  selector: 'app-cadastro-fluxo',
  templateUrl: './cadastro-fluxo.component.html',
  styleUrls: ['./cadastro-fluxo.component.scss']
})
export class CadastroFluxoComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  formularioCadastroFluxo!: FormGroup;

  constructor(
    private fluxoService: FluxoService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.formularioCadastroFluxo = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(''),
      descricao: new FormControl(''),
    });
  }

  cadastrarFluxo(): void{
    this.fluxoService
    .cadastrarFluxo(this.formularioCadastroFluxo.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.irParaLista();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  irParaLista() {
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
