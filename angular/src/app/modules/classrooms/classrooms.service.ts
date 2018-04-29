import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Classroom} from '../classrooms/classroom';

const CLASSROOM_API = 'api/classrooms';

@Injectable()
export class ClassroomsService {

  constructor(private http: HttpClient) { }

  public getAllClassrooms(): Observable<any> {
    return this.http.get(CLASSROOM_API).pipe(
      catchError(this.handleError)
    );
  }

  public deleteClassroom(classroom: Classroom): Observable<Classroom[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(CLASSROOM_API + '/' + classroom.id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public createClassroom(newClassroom: Classroom): Observable<Classroom> {
    let body = {
      location: newClassroom.location,
      description: newClassroom.description,
      capacity: newClassroom.capacity
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Classroom>(CLASSROOM_API, body, httpOptions).pipe(
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
  }
}
