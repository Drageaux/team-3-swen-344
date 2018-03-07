import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Reservation } from './reservation';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Classroom} from '../classrooms/classroom';

const RESERVATION_API = 'api/reservations';

@Injectable()
export class ReservationsService {

  constructor(private http: HttpClient) {
  }

  public getAllReservations(): Observable<any> {
    return this.http.get(RESERVATION_API).pipe(
      catchError(this.handleError)
    );
  }

  public deleteReservation(reservation: Reservation): Observable<Reservation[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(RESERVATION_API + '/' + reservation.id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public createReservation(classroom: Classroom, reservation: Reservation): Observable<Reservation> {
    const body = {
      classroomId: classroom.id,
      reservedBy: reservation.reservedBy,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Reservation>(RESERVATION_API, body, httpOptions).pipe(
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
