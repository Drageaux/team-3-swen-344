import {Component, OnInit} from '@angular/core';
import {Rental} from "./rental";
import {RentalsService} from "./rentals.service";
import { NgForm } from '@angular/forms';
//import { DatePipe } from '@angular/common';

declare var $;

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {

  private rentals: Rental[] = [];

  constructor(private rentalsService: RentalsService) {
    //let rental0 = new Rental(0,0,0,'Good','', 'April 8th, 2017', 'April 6th, 2018', 'April 4th, 2018');
    //let rental1 = new Rental(1,1,0,'Usable','It\'s still usable', 'April 8th, 2017', 'April 6th, 2018', 'April 4th, 2018');
    //let rental2 = new Rental(2,2,0,'Broken','Oh lord it breakeded', 'April 8th, 2017', 'April 6th, 2018', 'April 4th, 2018');
    //this.rentals = [rental0,rental1,rental2];
  }

  ngOnInit() {
    let today = new Date();
    console.log(today.setDate(today.getDate() + 10));
    this.rentalsService.getAllRentals().subscribe(
      rentals => {
        this.rentals = rentals;
      }
    );
  }

  onCreateRental(form: NgForm) {
    let newRental = new Rental();
    let today = new Date();
    let due = new Date();
    due.setDate(today.getDate() + 10);

    if(form.valid){
      newRental.deviceId = form.value.deviceId;
      newRental.renterId = form.value.renterId;
      newRental.rentDate = today.toDateString();
      newRental.dueDate = due.toDateString();
    }
    this.rentalsService.createRental(newRental).subscribe(
      rental => {
        location.reload();
        //this.rentals.push(rental);
      }
    );
  }

  onReturnRental(returnedRental : Rental, form: NgForm) {
    let today = new Date();
    if(form.valid){
      returnedRental.comment = form.value.comment;
      returnedRental.returnCondition = form.value.returnCondition;
      returnedRental.returnDate = today.toDateString();
    }
    this.rentalsService.returnRental(returnedRental).subscribe(
      rentals => {
        location.reload();
        //this.rentals = rentals;
      }
    );
  }

  onDeleteRental(rental) {
    this.rentalsService.deleteRental(rental).subscribe(
      rentals => {
        //this.rentals = rentals;
      }
    );
    location.reload();
  }

  testApi(){
    this.rentalsService.getAllRentals().subscribe(
      rentals => {
        this.rentals = rentals;
      }
    );
  }

  showCollapse(id: string): void {
    $('#' + id).collapse('toggle');
  }

}
