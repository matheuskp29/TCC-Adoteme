export default interface CreateClienteRequest {
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
}
