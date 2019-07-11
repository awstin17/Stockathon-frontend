import { Component, OnInit } from "@angular/core"
import { StockService } from "../stock.service"
import { UserService } from "../user.service"
import { Router } from "@angular/router"

@Component({
    selector: "app-daily",
    templateUrl: "./daily.component.html",
    styleUrls: ["./daily.component.scss"]
})
export class DailyComponent implements OnInit {
    abbreviation: any = {
        ticker: ""
    }
    stockData: any
    formattedStockData: any = []
    show: any
    userStocks: any

    constructor(
        private _stockservice: StockService,
        private _userservice: UserService,
        private _router: Router
    ) {}

    getStock() {
        //This first part makes a request to my database and receives an array of all stock objects that belong to the user

        this._stockservice
            .getFavorites(this._userservice.userId, this._userservice.userToken)
            .subscribe(response => {
                this.userStocks = response

                //This for loop loops through the array of stock objects and creates a new array of ticker strings

                // for(let j = 0; j < this.userStocks.length; j++) {

                //   this.tickers.push(this.userStocks[j].ticker)
                // }

                //This part takes that array of ticker strings and makes a request to get the most recent stock data for each of them
                //The response is an array of the observables for each ticker

                this._stockservice
                    .getDailyDataAll(this.userStocks)
                    .subscribe(response => {
                        this.stockData = response

                        //These two for loops loop through the array of observables, and then only through the first data set for each ticker
                        //In the loops, I take the most recent data for each ticker and assign it to an index of a new array of the most recent data sets for each ticker

                        for (let i = 0; i < this.stockData.length; i++) {
                            for (let date in this.stockData[i][
                                "Time Series (1min)"
                            ]) {
                                this.formattedStockData[i] = this.stockData[i][
                                    "Time Series (1min)"
                                ][date]
                                this.formattedStockData[i][
                                    "symbol"
                                ] = this.stockData[i]["Meta Data"]["2. Symbol"]
                                this.formattedStockData[i][
                                    "Last Refreshed"
                                ] = this.stockData[i]["Meta Data"][
                                    "3. Last Refreshed"
                                ]
                                this.formattedStockData[i][
                                    "appUserId"
                                ] = this.userStocks[i].appUserId
                                this.formattedStockData[i][
                                    "stockId"
                                ] = this.userStocks[i].id
                                break
                            }
                        }

                        //This is for my ngIf for the cards that display the data. Makes sure it happens only after
                        //the data is processed
                        this.show = "plz show"
                    })
            })
    }

    checkIsRealStock() {
        this._stockservice
            .getDailyData(this.abbreviation.ticker)
            .subscribe(response => {
                if (response["Error Message"]) {
                    window.alert(
                        "This is not a real stock symbol or there is no daily data for this symbol. Try another"
                    )
                } else {
                    this.addStock()
                }
            })
    }

    addStock() {
        this._stockservice
            .addStockToFavorites(
                this.abbreviation,
                window.sessionStorage.getItem("userId"),
                window.sessionStorage.getItem("token")
            )
            .subscribe(
                response => {
                    window.location.reload()
                },
                error => console.log(error)
            )
    }

    ngOnInit() {
        this.getStock()
    }

    deleteStock(i, userId, stockId) {
        this.formattedStockData.splice(i, 1)
        this._stockservice
            .deleteStock(userId, stockId)
            .subscribe(
                res => alert("successful deletion!"),
                err => alert("No deletion. Something went wrong :(")
            )
    }
}
