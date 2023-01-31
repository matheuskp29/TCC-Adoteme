import { HttpClient } from '@angular/common/http';
import Estado from './estado';
import {BehaviorSubject} from "rxjs";
import { Injectable } from '@angular/core';
import {BASE_URL} from "../../../utils/requests";

@Injectable({
  providedIn: 'root',
})
export class EstadoStoreService {

  private estadoSubject: BehaviorSubject<Estado[]> = new BehaviorSubject<Estado[]>([]);

  get estadoList$() {
    return this.estadoSubject.asObservable();
  }

  constructor(
    private httpClient: HttpClient,
  ) {
    this.getEstados();
  }

  public getEstados() {
    return this.httpClient.get<Estado[]>(`${BASE_URL}estado`).subscribe(res => {
      this.estadoSubject.next(res);
    })
  }
}
