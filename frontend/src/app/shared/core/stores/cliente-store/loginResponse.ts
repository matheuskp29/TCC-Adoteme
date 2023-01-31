import Cliente from "./cliente";

export default interface LoginResponse {
  token: string,
  role: string,
  cliente: Cliente
}
