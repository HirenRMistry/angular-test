import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

let serviceUrl: String = 'https://api.openweathermap.org/data/2.5/weather'
let apiKey: String = "194333f5b09188fbda8c4a3bbfea30b2 "  

@Injectable({
  providedIn: 'root'
})

export class WeatherDataService {

  constructor(private http: HttpClient) { }

  /*Loads data for a given city
  * @param city     Name of city to load data for
  */
  load(city: String) {
    return this.http.get(serviceUrl + '?q=' + city + '&units=metric&APPID=' + apiKey)
  }

  //Loads the data more multiple cities
  //[lon-left,lat-bottom,lon-right,lat-top,zoom] = [12,32,15,37,10]
  loadCities() {
    return this.http.get('https://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10' + '&APPID=' + apiKey)
  }

  getIconUrl(icon: String) {
    return 'http://openweathermap.org/img/w/' + icon + ".png"
  }
}
