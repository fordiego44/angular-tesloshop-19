import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@auth/interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';

type AuthStatus = 'checking' | 'not-authenticated' | 'authenticated'
const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class AuthService {


  private _authStatus = signal<AuthStatus>('checking')
  private _user = signal<User|null>(null);
  // private _token = signal<string|null>(null);
  private _token = signal<string|null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    loader: ()=> this.checkStatus()
  });

  authStatus = computed<AuthStatus>(()=>{
    if (this._authStatus() == 'checking') return 'checking';

    if (this._user()) {
        return 'authenticated';
    }
    return 'not-authenticated';
  });
  user = computed(()=>this._user());
  token = computed(this._token);
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

  login(email:string, password:string){

    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`,{
      email: email,
      password: password
    }).pipe(
      tap( resp =>  (this.handleAuthSuccess(resp))),
      catchError((error:any)=> this.handleAuthError(error))
    );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log('????????');

    if (!token) {
        this.logout();
        return of(false);
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`,{
      // headers:{
      //   Authorization: `Bearer ${token}`
      // }
    })
    .pipe(
      map((resp)=> this.handleAuthSuccess(resp)),
      catchError((error:any)=> this.handleAuthError(error))
    );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');
  }

  private handleAuthSuccess( {token, user}:AuthResponse ){
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('token', token);

    return true;
  }
  //any porque no vamos a tratar todos los tipos de errores
  private handleAuthError(error: any){
    this.logout();
    return of(false);
  }
}
