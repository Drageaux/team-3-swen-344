import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TweetModule } from 'ngx-tweet/lib/ngx-tweet.module';

@NgModule({
  imports: [
    CommonModule,
    TweetModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
