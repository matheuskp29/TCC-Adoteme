export default class AnuncioRequest {
  id?: number;
  titulo: string;
  descricao: string;
  idTipoAnimal: number;
  idIdade: number;
  idPorte: number;
  idTemperamento: number;
  emailCliente: string;

  constructor() {
    this.titulo = '';
    this.descricao = '';
    this.idTipoAnimal = 0;
    this.idIdade = 0;
    this.idPorte = 0;
    this.idTemperamento = 0;
    this.emailCliente = '';
  }
}
