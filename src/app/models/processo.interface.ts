import { AnotacaoModel } from "./anotacao.interface";
import { TipoProcesso } from "./tipo-processo.interface";

export interface ProcessoModel {
  id: number,
  idProcessoSuperior: number,
  idFluxo: number,
  nomeFluxo: string,
  nome: string,
  tipoProcesso: TipoProcesso,
  subProcessos?: ProcessoModel[],
  anotacoes?: AnotacaoModel[]
}
