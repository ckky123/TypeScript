import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveMovie } from '../../models/active-movie';
import * as _ from 'lodash';
import { SeatingPlan } from '../../models/seating/seating-plan';
import { SeatDetails } from '../../models/seating/seat-details';
import { SelectedSeatEventArgs } from './selected-seat-event-args';

@Component({
  selector: 'app-select-seat-container',
  templateUrl: './select-seat-container.component.html',
  styles: []
})
export class SelectSeatContainerComponent implements OnInit {

  seatingPlan$: SeatingPlan;
  selectedSeats$: Array<SeatDetails>;

  activeMovies$ : Array<ActiveMovie> = [  
   {  
      "activeMovieId":0,
      "date":"Select",
      "time":"Time",
      "venue": {
          "venueId": 0,
          "venueName": ""
      },
      "movie":{  
         "movieId":0,
         "movieName":"Select a Movie",
         "movieDescription":""
      }
   },
   {  
      "activeMovieId":1,
      "date":"14/10/2017",
      "time":"14:00",
      "venue": {
          "venueId": 1,
          "venueName": "Hall 1"
      },
      "movie":{  
         "movieId":1,
         "movieName":"Top Secret",
         "movieDescription":"Funniest Movie Ever Filmed"
      }
   },
   {  
      "activeMovieId":2,
      "date":"14/10/2017",
      "time":"16:00",
      "venue": {
          "venueId": 1,
          "venueName": "Hall 1"
      },
      "movie":{  
         "movieId":1,
         "movieName":"Top Secret",
         "movieDescription":"Funniest Movie Ever Filmed"
      }
   },
   {  
      "activeMovieId":3,
      "date":"14/10/2017",
      "time":"11:00",
      "venue": {
          "venueId": 2,
          "venueName": "Hall 2"
      },
      "movie":{  
         "movieId":2,
         "movieName":"Aliens",
         "movieDescription":"Scary Movie"
      }
   },
   {  
      "activeMovieId":4,
      "date":"14/10/2017",
      "time":"16:00",
      "venue": {
          "venueId": 3,
          "venueName": "Hall 3"
      },
      "movie":{  
         "movieId":2,
         "movieName":"Aliens",
         "movieDescription":"Scary Movie"
      }
   }
  ];
  
  activeMovie$: ActiveMovie;

  constructor(private router: Router,private route: ActivatedRoute) { 
  }

  ngOnInit() {
    let movieid:number = parseInt(this.route.snapshot.paramMap.get('activeMovieId'));

    this.selectedSeats$ = new Array<SeatDetails>();
    this.activeMovie$ = this.activeMovies$.find(x => x.activeMovieId == movieid);
	this.seatingPlan$ = {"rows":[{"rowNumber":1,"seats":[{"rowNumber":1,"positionId":0,"actualSeatNumber":0,"status":0},{"rowNumber":1,"positionId":0,"actualSeatNumber":0,"status":0},{"rowNumber":1,"positionId":0,"actualSeatNumber":0,"status":0},{"rowNumber":1,"positionId":0,"actualSeatNumber":0,"status":0},{"rowNumber":1,"positionId":0,"actualSeatNumber":0,"status":0},{"rowNumber":1,"positionId":6,"actualSeatNumber":1,"status":1},{"rowNumber":1,"positionId":7,"actualSeatNumber":2,"status":1},{"rowNumber":1,"positionId":8,"actualSeatNumber":3,"status":1},{"rowNumber":1,"positionId":9,"actualSeatNumber":4,"status":1},{"rowNumber":1,"positionId":10,"actualSeatNumber":5,"status":1},{"rowNumber":1,"positionId":11,"actualSeatNumber":6,"status":1},{"rowNumber":1,"positionId":12,"actualSeatNumber":7,"status":1},{"rowNumber":1,"positionId":13,"actualSeatNumber":8,"status":1},{"rowNumber":1,"positionId":14,"actualSeatNumber":9,"status":1},{"rowNumber":1,"positionId":15,"actualSeatNumber":10,"status":1}]},{"rowNumber":2,"seats":[{"rowNumber":2,"positionId":1,"actualSeatNumber":0,"status":0},{"rowNumber":2,"positionId":1,"actualSeatNumber":0,"status":0},{"rowNumber":2,"positionId":1,"actualSeatNumber":0,"status":0},{"rowNumber":2,"positionId":1,"actualSeatNumber":0,"status":0},{"rowNumber":2,"positionId":5,"actualSeatNumber":1,"status":1},{"rowNumber":2,"positionId":6,"actualSeatNumber":2,"status":1},{"rowNumber":2,"positionId":7,"actualSeatNumber":3,"status":1},{"rowNumber":2,"positionId":8,"actualSeatNumber":4,"status":1},{"rowNumber":2,"positionId":9,"actualSeatNumber":5,"status":1},{"rowNumber":2,"positionId":10,"actualSeatNumber":6,"status":1},{"rowNumber":2,"positionId":11,"actualSeatNumber":7,"status":1},{"rowNumber":2,"positionId":12,"actualSeatNumber":8,"status":1},{"rowNumber":2,"positionId":13,"actualSeatNumber":9,"status":1},{"rowNumber":2,"positionId":14,"actualSeatNumber":10,"status":1},{"rowNumber":2,"positionId":15,"actualSeatNumber":11,"status":1}]},{"rowNumber":3,"seats":[{"rowNumber":3,"positionId":1,"actualSeatNumber":1,"status":1},{"rowNumber":3,"positionId":2,"actualSeatNumber":2,"status":1},{"rowNumber":3,"positionId":3,"actualSeatNumber":3,"status":1},{"rowNumber":3,"positionId":4,"actualSeatNumber":4,"status":1},{"rowNumber":3,"positionId":5,"actualSeatNumber":5,"status":1},{"rowNumber":3,"positionId":6,"actualSeatNumber":6,"status":1},{"rowNumber":3,"positionId":7,"actualSeatNumber":7,"status":1},{"rowNumber":3,"positionId":8,"actualSeatNumber":8,"status":1},{"rowNumber":3,"positionId":9,"actualSeatNumber":9,"status":1},{"rowNumber":3,"positionId":10,"actualSeatNumber":10,"status":1},{"rowNumber":3,"positionId":11,"actualSeatNumber":11,"status":1},{"rowNumber":3,"positionId":12,"actualSeatNumber":12,"status":1},{"rowNumber":3,"positionId":13,"actualSeatNumber":13,"status":1},{"rowNumber":3,"positionId":14,"actualSeatNumber":14,"status":1},{"rowNumber":3,"positionId":15,"actualSeatNumber":15,"status":1}]},{"rowNumber":4,"seats":[{"rowNumber":4,"positionId":1,"actualSeatNumber":1,"status":1},{"rowNumber":4,"positionId":2,"actualSeatNumber":2,"status":1},{"rowNumber":4,"positionId":3,"actualSeatNumber":3,"status":1},{"rowNumber":4,"positionId":4,"actualSeatNumber":4,"status":1},{"rowNumber":4,"positionId":5,"actualSeatNumber":5,"status":1},{"rowNumber":4,"positionId":6,"actualSeatNumber":6,"status":1},{"rowNumber":4,"positionId":7,"actualSeatNumber":7,"status":1},{"rowNumber":4,"positionId":8,"actualSeatNumber":8,"status":1},{"rowNumber":4,"positionId":9,"actualSeatNumber":9,"status":1},{"rowNumber":4,"positionId":10,"actualSeatNumber":10,"status":1},{"rowNumber":4,"positionId":11,"actualSeatNumber":11,"status":1},{"rowNumber":4,"positionId":12,"actualSeatNumber":12,"status":1},{"rowNumber":4,"positionId":13,"actualSeatNumber":13,"status":1},{"rowNumber":4,"positionId":14,"actualSeatNumber":14,"status":1},{"rowNumber":4,"positionId":15,"actualSeatNumber":15,"status":1}]}]};
  }

  onSeatSelected(eventArgs: SelectedSeatEventArgs) {
    this.selectSeat(eventArgs.seat, eventArgs.newStatus);
  }

  selectSeat(seat: SeatDetails, newStatus: number){
    let newSelectedSeats = _.cloneDeep(this.selectedSeats$);

    // find the seat
    const myrow = this.seatingPlan$.rows.filter(row => row.rowNumber === seat.rowNumber)[0];
    const myseat = myrow.seats.filter(s => s.positionId === seat.positionId)[0];
    myseat.status = newStatus;

    if(newStatus == 9){
      newSelectedSeats.push(seat);
    }

    if(newStatus == 1){
      newSelectedSeats.splice(this.selectedSeats$.indexOf(seat), 1);
    }

    this.selectedSeats$ = _.uniqWith(newSelectedSeats, _.isEqual);
  }

    purchaseTickets() {
  }


}
