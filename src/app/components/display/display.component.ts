import { Component, OnInit } from '@angular/core';
import { Weather } from '../../app.component'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
weather: Weather = {
    city: "No City",
    conditions: "-",
    temperature: 0,
    icon: ""
  }
update(weather: Weather) {
    this.weather = weather
  }

  constructor() { }

  ngOnInit(): void {
  }

}
