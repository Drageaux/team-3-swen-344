import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SampleModel } from './sample.class';
import { SampleService } from "./sample.service";

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
  constructor(private sampleService: SampleService) { }

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
    this.sampleService.getSample() // first you call a function that returns an Observable type,
      .subscribe(data => console.log(data)); // then you ALWAYS subscribe to that function

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
    this.sampleService.postSample(newFirstName, this.sampleModel) // this returns an Observable of type SampleModel
      .subscribe(data => { // subscribe as always
        console.log(data);
        this.sampleModel = data; // we know that data is of type SampleModel, so there should not be type mismatch
      });
  }
}
