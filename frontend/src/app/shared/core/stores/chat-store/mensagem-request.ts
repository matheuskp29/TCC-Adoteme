export default interface MensagemRequest {
  codigoCliente: number;
  codigoClienteDestino: number;
  codigoAnuncio: string | number;
  descricao: string;
}
