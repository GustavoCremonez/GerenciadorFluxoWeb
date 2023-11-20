import { ProcessoModel } from './processo.interface';

export interface FluxoModel {
  id: number;
  nome: string;
  descricao: string;
  processos?: ProcessoModel[]
}
