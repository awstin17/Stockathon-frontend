import { Component } from '@angular/core';
import { StockService } from '../stock.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss']
})
export class TrendComponent {

  constructor(private _stockservice : StockService) { }

  character: any;
  abbreviation: any = {
    ticker: ""
  }
  data: any;
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
  
 
  updateChart() {
    
    //This section loops through the object of objects that contain data for each month
    
    for(let date in this.data["Monthly Time Series"]) {
      
     //This first if statement simply retrieves the number of the month of the latest data set. 
     //I use this to manipulate the labels array to display the months based on what the latest month is
      
          if(this.i === 0) {
            this.character = (date.charAt(5) == "0") ? date.charAt(6) : date.charAt(5) + date.charAt(6);
          }
          
          //This pushes the closing data number to the closing numbers array in each iteration of the loop.
          
          this.closingNumbers.push(this.data["Monthly Time Series"][date]["4. close"]);
          
          // This is adding one to my counter, and if the counter equals the number of months i want to display 
          //(in this case 12), the loop stops
          
          this.i++;
          if(this.i === this.months) {break}
        }
    
    //This part  reverses the closing numbers data points to display right on the graph, and then assigns the array in the proper dataset
    
    this.closingNumbers = this.closingNumbers.reverse();
    this.lineChartData = [{data: this.closingNumbers, label: 'Series A'}];
  
    //This part rearranges the labels array so that the last month where we got data from is the last label
  
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for(let k = 0; k < this.character; k++) {
        this.lineChartLabels.push(this.lineChartLabels.shift());
    }
  }

  //When the search button is clicked, this method gets the monthly data from the stock API based on the acronym in the input
  //Then, if you get a successful response, it saves that data, manipulates it to a presentable form, then updates the chart

  onSearch() {
    this._stockservice.getMonthlyData(this.abbreviation.ticker)
    .subscribe(
      (response: any) => {
        
        this.i = 0;
        this.closingNumbers = [];
        this.data = null;
        this.data = response;
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        this.updateChart();
      }
    )
  }
  
  onAdd() {
    this._stockservice.addStockToFavorites(this.abbreviation, window.sessionStorage.getItem('userId'),  window.sessionStorage.getItem('token'))
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
        )
  }
}
