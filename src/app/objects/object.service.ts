import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Object } from './object';
import { MessageService } from '../messages/message.service';


@Injectable({ providedIn: 'root' })
export class ObjectService {

//  private objectsUrl = 'https://museeumarchivebackend.herokuapp.com/objects';  // URL to web api
  private objectsUrl = '';  // URL to in-memory-database
  //private objectsUrl = 'http://echo.jsontest.com/id/1/name/test'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET objects from the server */
  getObjects(): Observable<Object[]> {
    return this.http.get<Object[]>(this.objectsUrl)
      .pipe(
        tap(_ => this.log('fetched objects')),
        catchError(this.handleError<Object[]>('getObjects', []))
      );
  }

  /** GET object by id. Return `undefined` when id not found */
  getObjectNo404<Data>(id: String): Observable<Object> {
    const url = `${this.objectsUrl}/?id=${id}`;
    return this.http.get<Object[]>(url)
      .pipe(
        map(objects => objects[0]), // returns a {0|1} element array
        tap(o => {
          const outcome = o ? 'fetched' : 'did not find';
          this.log(`${outcome} object id=${id}`);
        }),
        catchError(this.handleError<Object>(`getObject id=${id}`))
      );
  }

  /** GET object by id. Will 404 if id not found */
  getObject(id: String): Observable<Object> {
    const url = `${this.objectsUrl}/${id}`;
    return this.http.get<Object>(url).pipe(
      tap(_ => this.log(`fetched object id=${id}`)),
      catchError(this.handleError<Object>(`getObject id=${id}`))
    );
  }

  /** GET objects whose name contains search term */
  searchObjects(term: string): Observable<Object[]> {
    if (!term.trim()) {
      // if not search term, return empty object array.
      return of([]);
    }
    return this.http.get<Object[]>(`${this.objectsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found objects matching "${term}"`) :
         this.log(`no objects matching "${term}"`)),
      catchError(this.handleError<Object[]>('searchObjects', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new object to the server */
  addObject(object: Object): Observable<Object> {
    return this.http.post<Object>(this.objectsUrl, object, this.httpOptions).pipe(
      tap((newObject: Object) => this.log(`added object w/ id=${newObject.id}`)),
      catchError(this.handleError<Object>('addObject'))
    );
  }

  /** DELETE: delete the object from the server */
  deleteObject(id: String): Observable<Object> {
    const url = `${this.objectsUrl}/${id}`;

    return this.http.delete<Object>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted object id=${id}`)),
      catchError(this.handleError<Object>('deleteObject'))
    );
  }

  /** PUT: update the object on the server */
  updateObject(object: Object): Observable<any> {
    return this.http.put(this.objectsUrl, object, this.httpOptions).pipe(
      tap(_ => this.log(`updated object id=${object.id}`)),
      catchError(this.handleError<any>('updateObject'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ObjectService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ObjectService: ${message}`);
  }
}