import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import "rxjs/add/operator/map"
import { Observable } from "rxjs/Observable"
import "rxjs/add/observable/forkJoin"

@Injectable()
export class StockService {
    constructor(private http: HttpClient) {}

    getMonthlyData(stock) {
        return this.http.get(
            "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" +
                stock +
                "&apikey=T5397L2SSQQ1C8H9"
        )
    }

    getDailyData(stock) {
        return this.http.get(
            "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
                stock +
                "&interval=1min&apikey=T5397L2SSQQ1C8H9"
        )
    }

    getDailyDataAll(stocks) {
        return Observable.forkJoin(
            stocks.map(stock =>
                this.http.get(
                    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
                        stock.ticker +
                        "&interval=1min&apikey=T5397L2SSQQ1C8H9"
                )
            )
        )
    }

    addStockToFavorites(stock, id, token) {
        return this.http.post(
            "https://stockathon-backend.herokuapp.com/api/appUsers/" +
                id +
                "/stocks?access_token=" +
                token,
            stock
        )
    }

    getFavorites(id, token) {
        return this.http.get(
            "https://stockathon-backend.herokuapp.com/api/appUsers/" +
                id +
                "/stocks?access_token=" +
                token
        )
    }

    deleteStock(userId, stockId) {
        return this.http.delete(
            "https://stockathon-backend.herokuapp.com/api/appUsers/" +
                userId +
                "/stocks/" +
                stockId +
                "?access_token=" +
                window.sessionStorage.getItem("token")
        )
    }
}
