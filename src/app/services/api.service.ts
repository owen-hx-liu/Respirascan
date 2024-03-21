import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(url, { headers: headers });
  }

  post(url: string, model: any): Observable<any> {
    const body = JSON.stringify(model);
    const headers = this.getHeaders();
    return this.http.post(url, body, { headers: headers });
  }

  put(url: string, id: number, model: any): Observable<any> {
    const body = JSON.stringify(model);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, body, { headers: headers });
  }

  upload(url, formData: FormData): Observable<any> {
    const uploadReq = new HttpRequest('POST', url, formData, {
      reportProgress: true
    });

    return this.http.request(uploadReq);
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return headers;
  }
}
