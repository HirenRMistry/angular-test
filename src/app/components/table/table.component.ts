import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort  } from '@angular/material/sort';

import { TableData } from '../../app.component';
import { WeatherDataService } from '../../services/weatherdata.service';



function getData(id: number, list): TableData {
    var element = list['list'][id];

    return {
      city: element['name'],
      conditions: element['weather'][0]['main'],
      temperature: Math.round(element['main']['temp']),
      description: element['weather'][0]['description']
    };
  }
  @Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
  })
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['city', 'conditions', 'temperature', 'description'];
  dataSource: MatTableDataSource<TableData>;

  emplist = [] ;
  data = [] ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private weatherData: WeatherDataService) {
    const list = this.weatherData.loadCities().subscribe(val => {
        // this.data.push(val);
        // console.log(val);
        this.dataSource = new MatTableDataSource(
          Array.from({ length: 10 }, (_, k) => getData(k, val)));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    console.log(this.dataSource);

    });

    // console.log(list);
    // Create 100 employees
    // this.emplist = Array.from({ length: 10 }, (_, k) => getData(k + 1, list));
    // Assign the data to the data source
    // this.dataSource = new MatTableDataSource(this.emplist);

  }
  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

}
