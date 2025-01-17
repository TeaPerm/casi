import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api';

  setTokens(aToken: string,rToken: string): void {
    localStorage.setItem('accessToken', aToken);
    localStorage.setItem('refreshToken', rToken);
  }

  getTokens(): { aToken: string | null; rToken: string | null } {
    const aToken = localStorage.getItem('accessToken');
    const rToken = localStorage.getItem('refreshToken');
    return { aToken, rToken };
  }

  removeTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  constructor(private http: HttpClient) {}

  getUserDetails(endpoint: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers });
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(this.baseUrl+"/auth/login", body);
  }

  register(email: string, username: string, password: string): Observable<any> {
    const body = { email, username, password };
    return this.http.post(this.baseUrl+"/auth/signup", body);
  }
}
