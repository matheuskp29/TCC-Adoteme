import {Injectable} from "@angular/core";

const TOKEN_KEY = 'auth-token';
const ROLE = 'auth-role';
@Injectable({
  providedIn: 'root'
})
export class authStoreService {
  constructor() {
  }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveTokenRole(token: string, role: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(ROLE);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.sessionStorage.setItem(ROLE, role);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public getRole() {
    return sessionStorage.getItem(ROLE);
  }

}
