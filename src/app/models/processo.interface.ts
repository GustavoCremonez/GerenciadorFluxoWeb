import { AnotacaoModel } from "./anotacao.interface";
import { TipoProcesso } from "./tipo-processo.interface";

export interface ProcessoModel {
  id: number,
  idProcessoSuperior: number,
  idFluxo: number,
  nome: string,
  tipoProcesso: TipoProcesso,
  anotacoes?: AnotacaoModel[]
}
