import { EventEmitter, Injectable } from '@angular/core';
import { FluxoModel } from 'src/app/models/fluxo.interface';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  public urlApi = 'https://localhost:7063/';
}
