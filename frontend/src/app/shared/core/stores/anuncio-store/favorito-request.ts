export default class FavoritoRequest {
  codigoCliente: number;
  codigoAnuncio: number | string;

  constructor() {
    this.codigoCliente = 0;
    this.codigoAnuncio = 0;
  }
}
