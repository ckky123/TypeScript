import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MoviesComboItem } from '../../models/combos/movies-combo-item';
import { MovieTimesComboItem } from '../../models/combos/movie-times-combo-item';
import { ActiveMovie} from '../../models/active-movie';
import * as _ from 'lodash';

@Component({
  selector: 'app-select-movie-container',
  templateUrl: './select-movie-container.component.html'
})
export class SelectMovieContainerComponent implements OnInit {

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
  ]

  movies$: Array<MoviesComboItem>;
  movieTimes$: Array<MovieTimesComboItem>;
  currentSelectedMovieId : number = 0;
  currentSelectedActiveMovieId: number = 0;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.movies$ = _.uniqBy(
        this.activeMovies$.map(this.mapActiveMovieToMovieComboItem),
        'movieId');
    this.movieTimes$ = this.getMovieTimesCombo();
  }

  onSelectedMovieId(movieId: number) {
    this.currentSelectedMovieId = +movieId;
    this.movieTimes$ = this.getMovieTimesCombo();
	this.onSelectedActiveMovieId(0);
  }

  onSelectedActiveMovieId(activeMovieId: number) {
    this.currentSelectedActiveMovieId = +activeMovieId;
  }

  purchaseTickets() {
    if (this.currentSelectedActiveMovieId !== 0) {
      this.router.navigate(['/selectseats', this.currentSelectedActiveMovieId]);
    }
  }

  mapActiveMovieToMovieComboItem(activeMovie: ActiveMovie): MoviesComboItem {
    return {
      movieId: activeMovie.movie.movieId,
      movieName: activeMovie.movie.movieName
    }
  }  

  mapActiveMovieToMovieTimesComboItem(activeMovie: ActiveMovie): MovieTimesComboItem {
    return {
      activeMovieId: activeMovie.activeMovieId,
      date: activeMovie.date,
      time: activeMovie.time,
      venueName: activeMovie.venue.venueName
    }
  }

 getMovieTimesCombo(): Array<MovieTimesComboItem> {
    return this.activeMovies$
              .filter((activeMovie: ActiveMovie) =>
                activeMovie.movie.movieId === this.currentSelectedMovieId ||
                activeMovie.movie.movieId === 0)
              .map(activeMovie => {
                return this.mapActiveMovieToMovieTimesComboItem(activeMovie);
              });
  }
}
