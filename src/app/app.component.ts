import { Component, OnInit, ViewChild} from '@angular/core';

export class Weather {
  city: String
  conditions: String
  temperature: number
  icon: String
}
export class TableData {
  city: String
  conditions: String
  temperature: number
  description: String
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'weather';

    constructor() {
    }


    ngOnInit(): void{};


}
