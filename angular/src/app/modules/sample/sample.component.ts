import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

  // firstName is "Super" by default
  private sampleModel: any = {
    'firstName': 'Super',
    'lastName': 'Man'
  }

  // construct this component and inject dependencies (Component, Service, etc.)
  constructor(private http: HttpClient) { }

  ngOnInit() {
    let batString: string = 'Bat'
    // onInit, firstName is changed to "Bat"
    this.sampleModel.firstName = batString;
    this.printGetSample();
    this.printPostSample();
  }

  // custom sample call
  private printGetSample(): void {
    this.getSample() // first you call a function that returns an Observable type
      .subscribe(data => console.log(data)) // then you ALWAYS subscribe to that function
    // callback in TypeScript looks like this () => {},
    // where variables inside () are passed to the operations inside {}
  }

  private printPostSample(): void {
    this.postSample()
      .subscribe(data => console.log(data))
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

  private postSample(): Observable<any> {
    let body = {}; // define empty body 
    const httpOptions = { // define stub HTTP options
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post('api/sample', body, httpOptions)
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
