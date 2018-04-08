import {Injectable} from '@angular/core';

import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Rental} from './rental';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const RESERVATION_API = 'api/rentals';

@Injectable()
export class RentalsService {

  constructor(private http: HttpClient) {
  }

  public getAllRentals(): Observable<any> {
    return this.http.get(RESERVATION_API).pipe(
      catchError(this.handleError)
    );
  }

  public cancelRental(rental: Rental): Observable<Rental[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(RESERVATION_API + '/' + rental.id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public createRental(newRental: Rental): Observable<Rental> {
    let body = {
      id: newRental.id,
      deviceId: newRental.deviceId,
      renterId: newRental.renterId,
      returnCondition: newRental.returnCondition,
      comment: newRental.comment,
      rentDate: newRental.rentDate,
      dueDate: newRental.dueDate,
      returnDate: newRental.returnDate
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Rental>(RESERVATION_API, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  ////////////////
  //Error handler
  ///////////////
  private handleError(error: HttpErrorResponse) {
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
