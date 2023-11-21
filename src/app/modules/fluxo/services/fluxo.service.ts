import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { GlobalService } from '../../compartilhado/services/global.service';
import { Observable } from 'rxjs';
import { FluxoModel } from 'src/app/models/fluxo.interface';
import { ProcessoModel } from 'src/app/models/processo.interface';

@Injectable({
  providedIn: 'root'
})
export class FluxoService{
  constructor(private http: HttpClient, private globlalConst: GlobalService) { }

  get(): Observable<FluxoModel[]> {
    return this.http.get<FluxoModel[]>(`${this.globlalConst.urlApi}api/fluxo/`, {});
  }

  getById(id: number) : Observable<FluxoModel>{
    return this.http.get<FluxoModel>(`${this.globlalConst.urlApi}api/fluxo/${id}`, {});
  }

  post(fluxo: FluxoModel): Observable<any>{
    if(!fluxo.id) fluxo.id = 0;
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(fluxo);
    return this.http.post(`${this.globlalConst.urlApi}api/fluxo`, body, {'headers':headers})
  }

  put(fluxo: FluxoModel): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    const body = JSON.stringify(fluxo);
    return this.http.put(`${this.globlalConst.urlApi}api/fluxo`, body, {'headers':headers})
  }

  delete(id: number): Observable<any>{
    return this.http.delete(`${this.globlalConst.urlApi}api/fluxo/id?id=${id}`, {});
  }
}
