import { Component, OnInit } from "@angular/core"
import { StockService } from "../stock.service"

@Component({
    selector: "app-trend",
    templateUrl: "./trend.component.html",
    styleUrls: ["./trend.component.scss"]
})
export class TrendComponent {
    constructor(private _stockservice: StockService) {}

    abbreviation: any = {
        ticker: ""
    }
    data: any
    closingNumbers: number[] = []
    months: number = 12
    i: number = 0

    public lineChartData: Array<any> = [{ data: [], label: "Series A" }]
    public lineChartLabels: Array<any> = []
    public lineChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false
    }
    public lineChartColors: Array<any> = [
        {
            // grey
            backgroundColor: "rgba(2,95,247,0.2)",
            borderColor: "rgba(79,141,244,1)",
            pointBackgroundColor: "rgba(0,7,17,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(148,159,177,0.8)"
        },
        {
            // dark grey
            backgroundColor: "rgba(77,83,96,0.2)",
            borderColor: "rgba(77,83,96,1)",
            pointBackgroundColor: "rgba(77,83,96,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(77,83,96,1)"
        },
        {
            // grey
            backgroundColor: "rgba(148,159,177,0.2)",
            borderColor: "rgba(148,159,177,1)",
            pointBackgroundColor: "rgba(148,159,177,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(148,159,177,0.8)"
        }
    ]
    public lineChartLegend: boolean = false
    public lineChartType: string = "line"

    //This OnInit creates the array of months that become the chart and table labels
    ngOnInit() {
        let date = new Date()
        let monthNum = date.getMonth()
        let arrayOfMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
        for (let i = 0; i <= monthNum; i++) {
            arrayOfMonths.push(arrayOfMonths.shift())
        }
        this.lineChartLabels = arrayOfMonths
    }

    updateChart() {
        //Starts by resetting indices and variables so algorithm works properly
        this.i = 0
        this.closingNumbers = []

        //This section loops through the object of objects that contain data for each month
        for (let date in this.data["Monthly Time Series"]) {
            //This pushes the closing data number to the closing numbers array in each iteration of the loop.
            this.closingNumbers.push(
                this.data["Monthly Time Series"][date]["4. close"]
            )

            // This is adding one to my counter, and if the counter equals the number of months i want to display
            //(in this case 12), the loop stops
            this.i++
            if (this.i === this.months) {
                break
            }
        }

        //This part  reverses the closing numbers data points to display right on the graph, and then assigns the array in the proper dataset
        this.closingNumbers = this.closingNumbers.reverse()
        this.lineChartData = [{ data: this.closingNumbers, label: "Series A" }]
    }

    //When the search button is clicked, this method gets the monthly data from the stock API based on the acronym in the input
    //Then, if you get a successful response, it saves that data, manipulates it to a presentable form, then updates the chart
    searchMonthlyData() {
        this._stockservice.getMonthlyData(this.abbreviation.ticker).subscribe(
            (response: any) => {
                if (response["Error Message"]) {
                    window.alert("This is not a real stock symbol. Try another")
                } else {
                    this.data = response
                    this.updateChart()
                }
            },
            error => {},
            () => {}
        )
    }
}
