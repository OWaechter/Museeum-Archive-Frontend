import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Object } from './object';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ObjectService {
  private objectUrl = 'api/objects';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService

  ) { }

  getObjects(): Observable<Object[]> {
    return this.http.get<Object[]>(this.objectUrl)
      .pipe(
        tap(_ => this.log('fetched objects')),
        catchError(this.handleError<Object[]>('getObjects', []))
      );
  }

  getObjectNo404<Data>(id: number): Observable<Object> {

    const url = `${this.objectUrl}/?id=${id}`;
    return this.http.get<Object[]>(url)
      .pipe(
        map(objects => objects[0]),
        tap(h => {
          const outcome = h ? `fetched` : ' did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Object>(`getObject id=${id}`))
      );
  }

  getObject(id: number): Observable<Object> {
    const url = `${this.objectUrl}/${id}`;
    return this.http.get<Object>(url).pipe(
      tap(_ => this.log(`fetched object id=${id}`)),
      catchError(this.handleError<Object>(`getObject id=${id}`))
    );
  }

  addObject(object: Object): Observable<Object> {
    return this.http.post<Object>(this.objectUrl, object, this.httpOptions).pipe(
      tap((newObject: Object) => this.log(`added object w/ id=${newObject.id}`)),
      catchError(this.handleError<Object>('addObject'))
    );
  }

  deleteObject(id: number): Observable<Object> {
    const url = `${this.objectUrl}/${id}`;

    return this.http.delete<Object>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted object id=${id}`)),
      catchError(this.handleError<Object>('deletObject'))
    );
  }
  updateObject(object: Object): Observable<any> {
    return this.http.put(this.objectUrl, object, this.httpOptions).pipe(
      tap(_ => this.log(`updated object id = ${object.id}`)),
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
  private log(message: string) {
    this.messageService.add(`ObjectService: ${message}`);
  }
}
