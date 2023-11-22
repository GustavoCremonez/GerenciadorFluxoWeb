import { ProcessoService } from './../../services/processo.service';
import { TipoProcesso } from './../../../../models/tipo-processo.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario-processo',
  templateUrl: './formulario-processo.component.html',
  styleUrls: ['./formulario-processo.component.scss']
})
export class FormularioProcessoComponent  implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  formularioProcesso!: FormGroup;
  ehEdicao: boolean = false;
  tipoProcesso = TipoProcesso
  chavesEnum!: number[];
  idFluxo!: number;
  idProcessoSuperior!: number;

  constructor(
    private processoService: ProcessoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.route.params
    .subscribe(params => {
      this.idFluxo = params['idFluxo'];
      this.idProcessoSuperior = params['idProcessoSuperior'];
      if(params['id']){
        this.ehEdicao = true;
        this.buscarProcesso(params['id'])
      }
    });

    this.formularioProcesso = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl(''),
      idFluxo: new FormControl(this.idFluxo),
      idProcessoSuperior: new FormControl(this.idProcessoSuperior),
      tipoProcesso: new FormControl(''),
    });

    this.chavesEnum = Object.keys(this.tipoProcesso)
    .filter((f) => !isNaN(Number(f)))
    .map(x => parseInt(x));
  }

  SalvarInformacoes(): void{
    if(!this.ehEdicao){
      this.processoService
      .post(this.formularioProcesso.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.irParaLista();
          this.toastr.success('Processo cadastrado!', 'Sucesso!');
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Aconteceu um erro, tente novamente mais tarde!', 'Erro!');
        }
      })
    }else{
      this.processoService
      .put(this.formularioProcesso.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.irParaLista();
          this.toastr.success('Processo editado!', 'Sucesso!');
        },
        error: (error) => {
          console.error(error);
          this.toastr.error('Aconteceu um erro, tente novamente mais tarde!', 'Erro!');
        }
      })
    }
  }

  buscarProcesso(id: number): void{
    this.processoService.get(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => this.formularioProcesso.setValue(response),
      error: (error) => console.log(error)
    });
  }

  irParaLista(): void
  {
    this.router.navigate([`/processos/lista-processos/${this.idFluxo}`])
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
