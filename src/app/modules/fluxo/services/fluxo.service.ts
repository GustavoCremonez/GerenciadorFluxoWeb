import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { GlobalService } from '../../compartilhado/services/global.service';
import { Observable } from 'rxjs';
import { FluxoModel } from 'src/app/models/fluxo.interface';

@Injectable({
  providedIn: 'root'
})
export class FluxoService{
  constructor(private http: HttpClient, private globlalConst: GlobalService) { }

  buscarFluxos(): Observable<FluxoModel[]> {
    return this.http.get<FluxoModel[]>(`${this.globlalConst.urlApi}api/fluxo/`, {});
  }

  removerFluxo(id: number): Observable<any>{
    return this.http.delete(`${this.globlalConst.urlApi}api/fluxo/id?id=${id}`, {});
  }

  cadastrarFluxo(fluxo: FluxoModel): Observable<any>{
    if(!fluxo.id) fluxo.id = 0;
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(fluxo);
    return this.http.post(`${this.globlalConst.urlApi}api/fluxo`, body, {'headers':headers})
  }
}
