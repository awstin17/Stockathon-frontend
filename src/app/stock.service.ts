import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class StockService {

  constructor(private http : HttpClient) { }
  
  getMonthlyData(abbreviation) {
   return this.http.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + abbreviation + "&apikey=GGKHZQ2ZXMFO3FAY");
  }
  
  getDailyData(stocks) {
   return Observable
     .forkJoin(stocks
       .map((stock) => this.http.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + stock + "&interval=1min&apikey=GGKHZQ2ZXMFO3FAY")
       )
     )
     
  }
  
  addStockToFavorites(stock, id, token) {
   return this.http.post("http://summer-austin-2018-phortonssf.c9users.io:8080/api/appUsers/5b5e9f4157434775472ccdfc/stocks?access_token=qAizKGkk3ct8P7TuHI0GY98z3LmoaIPER1KVnUmtF2YRN91HoPEg69wmK2dhf5he", stock)
  }
  
  getFavorites(id, token) {
   return this.http.get("http://summer-austin-2018-phortonssf.c9users.io:8080/api/appUsers/" + id + "/stocks?access_token=" + token)
  }
}
