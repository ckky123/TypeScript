import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './modules/core/components/header.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { MovieSelectorComponent } from './modules/tickets/components/select-movie/movie-selector.component';
import { MovieDateSelectorComponent } from './modules/tickets/components/select-movie/movie-date-selector.component';
import { SelectMovieContainerComponent } from './modules/tickets/components/select-movie/select-movie-container.component';
import { RouterModule, Routes } from '@angular/router';
import { SelectSeatContainerComponent } from './modules/tickets/components/select-seat/select-seat-container.component';
import { SelectedMovieDetailsComponent } from './modules/tickets/components/selected-movie-details/selected-movie-details.component';
import { SeatChartComponent } from './modules/tickets/components/select-seat/seat-chart/seat-chart.component';
import { SelectedSeatsComponent } from './modules/tickets/components/select-seat/seat-chart/selected-seats.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'selectmovie', component: SelectMovieContainerComponent},
    {path: 'selectseats/:activeMovieId', component: SelectSeatContainerComponent},
    {path: '**', redirectTo: 'home'}
];

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    HomeComponent, 
    MovieSelectorComponent, 
    MovieDateSelectorComponent, 
    SelectMovieContainerComponent, 
    SelectSeatContainerComponent, 
    SelectedMovieDetailsComponent,
    SeatChartComponent,
    SelectedSeatsComponent
    
  ],
  imports: [
    BrowserModule,  
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
