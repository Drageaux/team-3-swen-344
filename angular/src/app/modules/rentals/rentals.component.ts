import {Component, OnInit} from '@angular/core';
import {Rental} from "./rental";
import {RentalsService} from "./rentals.service";

declare var $;

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {

  private rentals: Rental[] = [];

  constructor(private rentalsService: RentalsService) {
    let rental0 = new Rental(0,0,0,'Good','', 'April 8th, 2017', 'April 6th, 2018', 'April 4th, 2018');
    let rental1 = new Rental(1,1,0,'Usable','It\'s still usable', 'April 8th, 2017', 'April 6th, 2018', 'April 4th, 2018');
    let rental2 = new Rental(2,2,0,'Broken','Oh lord it breakeded', 'April 8th, 2017', 'April 6th, 2018', 'April 4th, 2018');
    this.rentals = [rental0,rental1,rental2];
  }

  ngOnInit() {
    this.rentalsService.getAllRentals().subscribe(
      rentals => {
        this.rentals = rentals;
      }
    );
  }

  onCancelRental(rental) {
    this.rentalsService.cancelRental(rental).subscribe(
      rentals => {
        this.rentals = rentals;
      }
    );
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
