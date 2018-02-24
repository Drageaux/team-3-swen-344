import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

import { SampleModel } from './sample.class';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  // firstName is "Super" by default
  private sampleModel: SampleModel = new SampleModel('Super', 'Man');
  private inputString: string;

  // construct this component and inject dependencies (Component, Service, etc.)
  constructor(private http: HttpClient) { }

  ngOnInit() {
    let batString: string = 'Bat';
    // onInit, firstName is changed to "Bat"
    this.sampleModel.firstName = batString;
    this.printGetSample();
  }

  /**
   * Sample DocComment for a custom sample call.
   * Prints a message from the backend.
   * @returns void.
   */
  private printGetSample(): void {
    this.getSample() // first you call a function that returns an Observable type,
      .subscribe(data => console.log(data)) // then you ALWAYS subscribe to that function

    // callbacks in TypeScript looks like this () => {}, but a one-liner operation doesn't require {};
    // variables inside () are passed to the operations inside {}
  }

  /**
   * Example form.
   * @param form - an NgForm from the template
   * @returns void.
   */
  private onSubmit(form: NgForm): void {
    // we're not accessing anything from this form yet; we just used it for example
    let newFirstName = this.inputString; // access the input directly
    this.postSample(newFirstName) // this returns an Observable of type SampleModel
      .subscribe(data => { // subscribe as always
        console.log(data);
        this.sampleModel = data; // we know that data is of type SampleModel, so there should not be type mismatch
      });
  }


  /****************
   * API REQUESTS *
   ****************/
  // an API request call can be reused, so it tends to be public and shared by a Service instead
  private getSample(): Observable<any> {
    return this.http.get('api/sample')
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // PUT/POST requests are a bit more complicated, since they require a JSON payload body
  // return an Observable of type SampleModel
  private postSample(newFirstName: string): Observable<SampleModel> {
    // define JSON payload body 
    let body = {
      newFirstName: newFirstName,
      lastName: this.sampleModel.lastName // lastName is unchanged
    };
    // define stubbed HTTP options
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<SampleModel>('api/sample', body, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  /********************
   * HELPER FUNCTIONS *
   ********************/

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
  };
}
