import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { FluxoService } from '../../services/fluxo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-fluxo',
  templateUrl: './formulario-fluxo.component.html',
  styleUrls: ['./formulario-fluxo.component.scss']
})
export class FormularioFluxoComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  formularioCadastroFluxo!: FormGroup;
  ehEdicao: boolean = false;

  constructor(
    private fluxoService: FluxoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.formularioCadastroFluxo = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(''),
      descricao: new FormControl(''),
    });

    this.route.params
    .subscribe(params => {
      const id = params['id']

      if(id){
        this.dadosAEditar(id),
        this.ehEdicao = true
      }
    });
  }

  SalvarInformacoes(): void{
    if (!this.ehEdicao) {
      this.fluxoService
      .post(this.formularioCadastroFluxo.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.irParaLista();
          this.toastr.success('Fluxo cadastrado com sucesso!', 'sucesso!');
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Aconteceu um erro, tente novamente mais tarde!', 'Erro!');
        }
      })
    } else {
      this.fluxoService
      .put(this.formularioCadastroFluxo.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.irParaLista();
          this.toastr.success('Fluxo editado com sucesso!', 'sucesso!');
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Aconteceu um erro, tente novamente mais tarde!', 'Erro!');
        }
      })
    }
  }

  irParaLista() {
    this.router.navigate(['']);
  }

  dadosAEditar(id: number): void{
    this.fluxoService
    .getById(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        this.formularioCadastroFluxo.setValue(response);
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
