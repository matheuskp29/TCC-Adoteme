export default interface SelectedChat {
  anuncioId: string | number;
  tituloAnuncio: string;
  nomeClienteAnuncio: string;
  nomeClienteInteressado: string;
  codigoClienteAutenticado: number;
  codigoClienteDestino: number;
  codigoChat: number;
  status: boolean;
}
