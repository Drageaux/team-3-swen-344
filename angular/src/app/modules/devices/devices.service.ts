import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Device } from './device';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const DEVICE_API = 'http://localhost:3000/api/devices';

@Injectable()
export class DevicesService {

  constructor(private http: Http) {
  }

  public getAllDevices(): Observable<Device[]> {
    return this.http.get(DEVICE_API).map(
      response => {
        const devices = response.json();
        return devices.map((device) => new Device(device));
      }).catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
