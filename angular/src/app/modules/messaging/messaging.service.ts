import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Message } from './message';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const DEVICE_API = 'api/messaging';

@Injectable()
export class MessageService {

  constructor(private http: HttpClient) {
  }

  public getAllMessages(id): Observable<any> {
    return this.http.get(DEVICE_API + '/to/' + id).pipe(
      catchError(this.handleError)
    );
  }

  public createMessage(newMessage: Message): Observable<Message[]> {
    let body = {
      fromId: newMessage.fromId,
      toId: newMessage.toId,
      dateCreated: Date.now(),
      title: newMessage.title,
      message: newMessage.message,
      deleted: false
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Message>(DEVICE_API, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public deleteMessage(id): Observable<Message[]> {
    console.log(DEVICE_API + '/' + id);
    return this.http.delete(DEVICE_API + '/' + id).pipe(
      catchError(this.handleError)
    );
  }

  ////////////////
  //Error handler
  ///////////////
  private handleError (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // a client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // the backend returned an unsuccessful response code.
      // the response body may contain clues as to what went wrong,
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
        'Something bad happened; please try again later.');
  };

}
