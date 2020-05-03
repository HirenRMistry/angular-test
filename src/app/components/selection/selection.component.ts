import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { WeatherDataService } from '../../services/weatherdata.service'

import { Weather } from '../../app.component';
import { TableData } from '../../app.component'

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
   @Output() onSelection: EventEmitter<Weather> = new EventEmitter<Weather>()
  weather: Weather = new Weather()

  city: String = ""

  constructor(private weatherData: WeatherDataService) { }

  ngOnInit(): void {
  }

submit() {
    this.weatherData.load(this.city).subscribe(data => {
      this.weather.city = data['name']
      this.weather.conditions = data['weather'][0]['main']
      this.weather.temperature = Math.round((data['main']['temp']))
      this.weather.icon = this.weatherData.getIconUrl(data['weather'][0]['icon'])

      this.onSelection.emit(this.weather)
    })
  }





}
