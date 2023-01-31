export default class Cliente {
  codigo: number;
  nome: string;
  email: string;
  senha: string;
  documento: string;
  telefone: string;
  logradouro: string;
  complemento: string;
  cep: string;
  cidade: string;
  estado: number;
  bairro: string;

  constructor(cliente?: any) {
    this.codigo = cliente?.codigo ?? 0;
    this.nome = cliente?.nome ?? '';
    this.email = cliente?.email ?? '';
    this.senha = cliente?.senha ?? '';
    this.documento = cliente?.documento ?? '';
    this.telefone = cliente?.telefone ?? '';
    this.logradouro = cliente?.logradouro ?? '';
    this.complemento = cliente?.complemento ?? '';
    this.cep = cliente?.cep ?? '';
    this.cidade = cliente?.cidade ?? '';
    this.estado = cliente?.estado ?? 0;
    this.bairro = cliente?.bairro ?? '';
  }
}
