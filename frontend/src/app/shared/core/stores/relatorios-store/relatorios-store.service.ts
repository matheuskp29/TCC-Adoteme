import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import RelatorioResponse from './relatorio-response';
import {BASE_URL} from "../../../utils/requests";

@Injectable({
  providedIn: 'root',
})
export class RelatoriosStoreService {
  private relatorioSubject: BehaviorSubject<RelatorioResponse> =
    new BehaviorSubject(new RelatorioResponse());

  get relatorio$() {
    return this.relatorioSubject.asObservable();
  }

  constructor(private httpClient: HttpClient) {
    this.getRelatorio();
  }

  getRelatorio() {
    this.httpClient
      .get<RelatorioResponse>(`${BASE_URL}relatorio`)
      .subscribe((relatorio) => {
        this.relatorioSubject.next(relatorio);
      });
  }
}
