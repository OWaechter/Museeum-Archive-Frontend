import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Object } from './object';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  // Define API
  apiURL = 'https://museeumarchivebackend.herokuapp.com/';
  constructor(private http: HttpClient) {}
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // HttpClient API get() method => Fetch Object List
  getObjects(): Observable<Object> {
    return this.http
      .get<Object>(this.apiURL + '/objects')
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API get() method => Fetch Object
  getObject(id: any): Observable<Object> {
    return this.http
      .get<Object>(this.apiURL + '/objects/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API post() method => Create Object
  createObject(object: any): Observable<Object> {
    return this.http
      .post<Object>(
        this.apiURL + '/objects',
        JSON.stringify(object),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API put() method => Update object
  updateObject(id: any, object: any): Observable<Object> {
    return this.http
      .put<Object>(
        this.apiURL + '/objects/' + id,
        JSON.stringify(object),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API delete() method => Delete Object
  deleteObject(id: any) {
    return this.http
      .delete<Object>(this.apiURL + '/objects/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}