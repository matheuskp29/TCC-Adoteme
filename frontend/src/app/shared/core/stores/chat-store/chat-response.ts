export default interface ChatResponse {
  codigoAnuncio: number;
  tituloAnuncio: string;
  codigoClienteAutenticado: number;
  codigoClienteDestino: number;
  nomeClienteAnuncio: string;
  nomeClienteInteressado: string;
  codigoChat: number;
  status: boolean;
  fotoAnuncio?: Blob;
}
