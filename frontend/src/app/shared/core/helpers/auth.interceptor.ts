import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {authStoreService} from "../stores/auth-store/auth-store.service";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {NotificationService} from "../stores/notification-service/notification.service";
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: authStoreService,
              private router: Router,
              private notificationService: NotificationService,
              ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }
    return next.handle(authReq).pipe(
      catchError((err) => {
        if (err.status === 401) {
          if (err.error && token) {
            sessionStorage.clear();
            this.router.navigate(['/login']);
            this.notificationService.showWarning(
              'Sessão expirada',
              'Atenção!'
            );
          }
        }
        return throwError(err);
      })
    );
  }
}
