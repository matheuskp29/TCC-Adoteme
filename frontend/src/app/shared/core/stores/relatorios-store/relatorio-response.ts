export default class RelatorioResponse {
  quantidadeAnuncios: number;
  quantidadeUsuarios: number;
  quantidadeAnunciosAtivos: number;
  quantidadeUsuariosAtivos: number;
  quantidadeAnunciosCachorro: number;
  quantidadeAnunciosGato: number;
  quantidadeAnunciosPassaro: number;
  quantidadeAnunciosTartaruga: number;

  constructor() {
    this.quantidadeAnuncios = 0;
    this.quantidadeUsuarios = 0
    this.quantidadeAnunciosAtivos = 0;
    this.quantidadeUsuariosAtivos = 0;
    this.quantidadeAnunciosCachorro = 0;
    this.quantidadeAnunciosGato = 0;
    this.quantidadeAnunciosPassaro = 0;
    this.quantidadeAnunciosTartaruga = 0;
  }
}
