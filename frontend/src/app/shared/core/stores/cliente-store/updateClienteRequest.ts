export default interface UpdateClienteRequest {
  codigo: number,
  nome: string;
  senha: string;
  telefone: string;
  logradouro: string;
  complemento: string;
  cep: string;
  cidade: string;
  estado: number;
  bairro: string;
}
