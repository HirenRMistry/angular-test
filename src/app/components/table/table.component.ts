import { Component, OnInit, ViewChild} from '@angular/core';

//Import Sort, Paginator Modules for Table
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort  } from '@angular/material/sort';

//Import TableData Class
import { TableData } from '../../app.component';

//Import Service for gatting Data from API
import { WeatherDataService } from '../../services/weatherdata.service';

//Import Chart Modules
import { Chart } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

//Function returns a TableData Object given a list of data
// & number of object to parse
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
  chart: Chart;
  emplist = [] ;
  data = [] ;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private weatherData: WeatherDataService) {
    const list = this.weatherData.loadCities().subscribe(val => {
        // this.data.push(val);
        // console.log(val);
        this.dataSource = new MatTableDataSource(
          Array.from({ length: 15 }, (_, k) => getData(k, val)));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.data = this.dataSource.filteredData;
        // console.log(this.dataSource);
        const cities: string[] = this.data.map(item =>
          item.city.toString());
        const temps :number[] = this.data.map(item => item.temperature);
        const average = list => list.reduce((prev, curr) => prev + curr) / list.length;
        console.log(Math.round(average(temps)));
        const averageTemp  = average(temps).toFixed(1);

        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: cities,
            datasets: [
              {
                label:'Temperature',
                data: temps,
                fill: true,
                borderColor: 'rgba(36, 82, 156, 1)',
                backgroundColor: 'rgba(152, 186, 239, 0.49)',
                pointBorderColor: "#fff",
                pointBackgroundColor: "rgba(179,181,198,1)",
              }
              ]
            },
            options: {
              "scales": {
                yAxes: [{
                  scaleLabel: {
                    display:true,
                    labelString : 'Temperature'
                  },
                  ticks: {
                    min : Math.min.apply(Math, temps)-2,
                    // max: Math.max.apply(Math, temps)+2,
                    stepSize: 2
                  }
                }],
                xAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Cities'
                  }
                }]
              },
              annotation: {
                annotations: [{
                  type: 'line',
                  mode: 'horizontal',
                  scaleID: 'y-axis-0',
                  value: averageTemp,
                  borderColor: 'tomato',
                  borderWidth: 1,
                  label: {
                    enabled: true,
                    position: 'left',
                    content: 'Mean Temp ' + averageTemp.toString() + '°C' ,
                  }
                }]
              } ,


            },
            plugins: [ChartAnnotation]


          });
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
