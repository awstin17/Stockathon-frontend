import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {
  
  abbreviation: any = [];
  data: any;
  symbolData: any = [];
  userData: any;
  show: any;

  stockData: any;
  stocks: string[] = ["MSFT", "GOOG"];
  test: any;
  objectToArray: Object[];
  
  constructor(private _stock : StockService, private _user : UserService) { }

  getStock() {
    
  this._stock.getFavorites(window.sessionStorage.getItem('userId'),  window.sessionStorage.getItem('token'))
      .subscribe(
        (res) => {
          this.show=null;
          console.log(res, "first part")
          this.test = res
          console.log(this.test)
          for(let j = 0; j < this.test.length; j++) {
            
            console.log(this.test[j]);
            this.abbreviation.push(this.test[j].ticker)
            console.log(this.abbreviation);
          }
          
           this._stock.getDailyData(this.abbreviation)
            .subscribe(
                (response) => {console.log(response, "hit")
                    this.stockData = response;
                    for(let i = 0; i < this.stockData.length; i++) {
                    console.log(this.stockData);
                    
                      for(let date in this.stockData[i]["Time Series (1min)"]) {
                        this.symbolData[i] = this.stockData[i]["Time Series (1min)"][date];
                        this.symbolData[i]["symbol"] = this.stockData[i]["Meta Data"]["2. Symbol"];
                        console.log(this.symbolData);
                        break;
                      }
                    // for(let i = 0; i < this.stockData.length; i++) {
                    //   for(let date in this.stockData["Time Series (1min)"]) {
                            // this.symbolData[i] = this.stockData[i]["Time Series (1min)"]["2018-07-30 14:21:00"];
                            // this.symbolData[i]["symbol"] = this.stockData[i]["Meta Data"]["2. Symbol"];
                              // break;
                    }
                    this.show="plz show";
                }
            )
        }
      )
        //   this._stock.getDailyData(this.abbreviation)
        //       .subscribe(
         
        // )}
        
        // this.userData = res;
          // this.abbreviation = this.userData.cards;
          // console.log(this.abbreviation)
          // this._stock.getDailyData(this.abbreviation)
        
    // this._user.getUser(window.sessionStorage.getItem('userId'),  window.sessionStorage.getItem('token'))
    //   .subscribe(
    //     (res) => {
    //       console.log(res, "first part")
    //       this.userData = res;
    //       this.abbreviation = this.userData.cards;
    //       console.log(this.abbreviation)
    //       this._stock.getDailyData(this.abbreviation)
    //           .subscribe(
    //               (response) => {console.log(response, "hit")
    //                 this.stockData = response;
    //                 for(let i = 0; i < this.stockData.length; i++) {
    //                 console.log(this.stockData[0]["Time Series (1min)"]["2018-07-30 14:21:00"]);
    //                 // for(let i = 0; i < this.stockData.length; i++) {
    //                 //   for(let date in this.stockData["Time Series (1min)"]) {
    //                         this.symbolData[i] = this.stockData[i]["Time Series (1min)"]["2018-07-30 14:21:00"];
    //                         this.symbolData[i]["symbol"] = this.stockData[i]["Meta Data"]["2. Symbol"];
    //                           // break;
    //                   // }
    //                 // }
    //                 console.log(this.symbolData);}
                    
    //                 this.show="yes plz"
    //               }
                  
                  
    //               )
    //                             }
    //           )
    // this._stock.getDailyData(this.stocks)
    //   .subscribe(
    //     (response) => {console.log(response, "hit")})
                      
      
      
  }

  ngOnInit() {
    
    this.getStock();
    
    // this.show = null;
    // this._user.getUser(window.sessionStorage.getItem('userId'),  window.sessionStorage.getItem('token'))
    //   .subscribe(
    //     (response) => {
    //       this.userData = response;
    //       this.abbreviation = this.userData.cards;
    //       console.log("this is running");
          
    //       for(let i = 0; i < this.abbreviation.length; i++) {
    // this._stock.getDailyData(this.abbreviation[i])
    //   .subscribe(
    //       (response) => {
    //       this.data = response;

          
    //       for(let date in this.data["Time Series (1min)"]) {
    //         this.symbolData[i] = this.data["Time Series (1min)"][date];
    //       break;
    //       }
        
    //       this.symbolData[i]["symbol"] = this.data["Meta Data"]["2. Symbol"];
    //       this.show="yes plz";
    //       },
    //     )
  //   } 
          
  //       }
  //       )
    
    
  }


}
