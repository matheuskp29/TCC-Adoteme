export default class AnuncioAlteracaoRequest {
  id?: string;
  titulo: string;
  descritivo: string;
  idTipoAnimal: number;
  idIdade: number;
  idPorte: number;
  idTemperamento: number;

  constructor() {
    this.titulo = '';
    this.descritivo = '';
    this.idTipoAnimal = 0;
    this.idIdade = 0;
    this.idPorte = 0;
    this.idTemperamento = 0;
  }
}
