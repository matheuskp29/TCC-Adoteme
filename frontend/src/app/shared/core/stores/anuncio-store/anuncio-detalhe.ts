export default class AnuncioDetalhe {
  tituloAnuncio: string;
  descricao: string;
  foto?: Blob
  meuAnuncio: boolean;
  idTemperamento: number;
  temperamentoNome: string;
  idPorte: number;
  porteNome: string;
  idTipoAnimal: number;
  tipoAnimal: string;
  idIdade: number;
  idade: string;
  clienteId: number;
  clienteNome: string;
  clienteTelefone: string;
  codigoFavorito?: number;

  constructor() {
    this.tituloAnuncio = '';
    this.descricao = '';
    this.meuAnuncio = false;
    this.idTemperamento = 0;
    this.temperamentoNome = '';
    this.idPorte = 0;
    this.porteNome = '';
    this.idTipoAnimal = 0;
    this.tipoAnimal = '';
    this.idIdade = 0;
    this.idade = '';
    this.clienteId = 0;
    this.clienteNome = '';
    this.clienteTelefone = '';
  }
}
