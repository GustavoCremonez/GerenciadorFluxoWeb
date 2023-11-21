import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GlobalService } from '../../compartilhado/services/global.service';
import { Observable } from 'rxjs';
import { ProcessoModel } from 'src/app/models/processo.interface';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  constructor(private http: HttpClient, private globlalConst: GlobalService) { }

  get(id: number): Observable<any>{
    return this.http.get<any>(`${this.globlalConst.urlApi}api/processo/${id}`, {});
  }

  getProcessosPorFluxo(idFluxo: number) : Observable<any>{
    return this.http.get<any>(`${this.globlalConst.urlApi}api/processo/GetByFluxo?id=${idFluxo}`, {});
  }

  post(processo: ProcessoModel): Observable<any>{
    if(!processo.id) processo.id = 0;
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(processo);
    return this.http.post(`${this.globlalConst.urlApi}api/processo`, body, {'headers':headers})
  }

  put(processo: ProcessoModel): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(processo);
    return this.http.put(`${this.globlalConst.urlApi}api/processo`, body, {'headers':headers})
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.globlalConst.urlApi}api/processo?id=${id}`, {});
  }
}
