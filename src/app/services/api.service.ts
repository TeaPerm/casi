import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8000/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Example GET request
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(this.baseUrl+"/auth/login", body);
  }
}
