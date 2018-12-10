import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {
  
  abbreviation: any = {
    ticker: ""
  }
  // tickers: any = [];
  ticker
  symbolData: any = [];
  show: any;
  userStocks: any;
  stockData: any;
  
  constructor(private _stockservice : StockService, private _userservice : UserService, private _router : Router) {};
  
  getStock() {
    
  //This first part makes a request to my database and receives an array of all stock objects that belong to the user
  
  this._stockservice.getFavorites(this._userservice.userId, this._userservice.userToken)
      .subscribe(
        (response) => {
          this.userStocks = response;
          console.log(this.userStocks);
          
          //This for loop loops through the array of stock objects and creates a new array of ticker strings
          
          // for(let j = 0; j < this.userStocks.length; j++) {
           
          //   this.tickers.push(this.userStocks[j].ticker)
          // }
          
          //This part takes that array of ticker strings and makes a request to get the most recent stock data for each of them
          //The response is an array of the observables for each ticker
          
           this._stockservice.getDailyData(this.userStocks)
            .subscribe(
                (response) => {
                    this.stockData = response;
                    
                    //These two for loops loop through the array of observables, and then only through the first data set for each ticker
                    //In the loops, I take the most recent data for each ticker and assign it to an index of a new array of the most recent data sets for each ticker
                    
                    for(let i = 0; i < this.stockData.length; i++) {
                      for(let date in this.stockData[i]["Time Series (1min)"]) {
                        this.symbolData[i] = this.stockData[i]["Time Series (1min)"][date];
                        this.symbolData[i]["symbol"] = this.stockData[i]["Meta Data"]["2. Symbol"];
                        this.symbolData[i]["Last Refreshed"] = this.stockData[i]["Meta Data"]["3. Last Refreshed"];
                        this.symbolData[i]["appUserId"] = this.userStocks[i].appUserId;
                        this.symbolData[i]["stockId"] = this.userStocks[i].id;
                        break;
                      }
                    }
                   
                    //This is for my ngIf for the cards that display the data. Makes sure it happens only after 
                    //the data is processed
                    this.show="plz show";
                  
                }
            )
        }
      )
  }
  
  onAdd() {
    this._stockservice.addStockToFavorites(this.abbreviation, window.sessionStorage.getItem('userId'),  window.sessionStorage.getItem('token'))
      .subscribe(
        (response) => {console.log(response); window.location.reload();},
        (error) => console.log(error)
        )
  }

  ngOnInit() {this.getStock();}

  deleteStock(i, userId, stockId) {
    this.symbolData.splice(i, 1);
    console.log(userId, stockId)
    this._stockservice.deleteStock(userId, stockId)
      .subscribe(
        (res) => console.log('success!'),
        (err) => console.log('failure :(')
      )
  }

}
