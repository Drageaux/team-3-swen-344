import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Device } from './device';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const DEVICE_API = 'api/devices';

@Injectable()
export class DevicesService {

  constructor(private http: HttpClient) {
  }

  public getAllDevices(): Observable<any> {
    return this.http.get(DEVICE_API).pipe(
      catchError(this.handleError)
    );
  }

  public createDevice(newDevice: Device): Observable<Device[]> {
    let body = {
      name: newDevice.name,
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Device>(DEVICE_API, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public editDevice(editedDevice: Device): Observable<Device[]> {
    let body = {
      id: editedDevice.id,
      name: editedDevice.name
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Device>(DEVICE_API, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  public deleteDevice(device: Device): Observable<Device[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(DEVICE_API + '/' + device.id, httpOptions).pipe(
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
