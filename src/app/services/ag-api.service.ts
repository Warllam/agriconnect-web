import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgApiService {
  private API_URL = "http://localhost:10000";

  constructor(private http: HttpClient) { }

  get$(url: string): Observable<any> {
    return this.http.get(this.API_URL+"/"+url).pipe(
        //tap(response => console.log('Response:', response)),
        catchError(this.handleError)
    );
  }

  post$(url: string, body: any): Observable<any> {
    return this.http.post(url, body).pipe(
        catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error.message || error);
    return throwError(() => new Error(`Une erreur est survenue : ${error.status} ${error.statusText || ''} - ${error.error ? error.error.message : ''}`));
  }

  getCapteurs(): Observable<any> {
    return this.get$('api/capteurs');
  }

  getRelevés(): Observable<any> {
    return this.get$('api/releves');
  }

  getActionneurs(): Observable<any> {
    return this.get$('api/actionneurs');
  }
}
