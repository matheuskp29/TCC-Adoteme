export default class Anuncio {
  id: number;
  titulo: string;
  tipoAnimal: string;
  idade: string;
  porte: string;
  temperamento: string;
  foto?: Blob;
  codigoFavorito?: number;
  codigoDonoAnuncio: number;

  constructor() {
    this.id = 0;
    this.titulo = '';
    this.tipoAnimal = '';
    this.idade = '';
    this.porte = '';
    this.temperamento = '';
    this.codigoDonoAnuncio = 0;
  }
}
