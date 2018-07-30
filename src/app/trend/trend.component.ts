import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent implements OnInit {

  abbreviation: string = "";
  data: any;
  data2: any;
  closingNumbers: number[] = [];
  months: number = 12;
  i: number = 0;
  
  public lineChartData:Array<any> = [
    {data: [], label: 'Series A'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
 
  public updateChart():void {
    this.lineChartData = [
    {data: this.closingNumbers, label: 'Series A'}
  ];
  }

  constructor(private _search : StockService) { }

  ngOnInit() {
  }



  onSearch() {
    this._search.getData(this.abbreviation)
    .subscribe(
      (response: any) => {
        this.i = 0;
        this.closingNumbers = [];
        this.data = null;
        this.data2 = null;
        this.data = response;
        
        for(let date in this.data["Monthly Time Series"]) {
          if(this.i <= this.months){
          this.i++;
          this.closingNumbers.push(this.data["Monthly Time Series"][date]["4. close"]);
          }
        }
        
        this.closingNumbers = this.closingNumbers.slice(0, 12).reverse();
        this.updateChart();
      }
      )
  }
}
