"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var TrendComponent = /** @class */ (function () {
    function TrendComponent(_stockservice) {
        this._stockservice = _stockservice;
        this.abbreviation = "";
        this.closingNumbers = [];
        this.months = 12;
        this.i = 0;
        this.lineChartData = [
            { data: [], label: 'Series A' }
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.lineChartOptions = {
            responsive: true
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    TrendComponent.prototype.setTimeout = function () { };
    TrendComponent.prototype["function"] = function () {
        this.chartConfig.data.datasets = [{ data: values }];
        this.chartConfig.labels = labels;
    };
    ;
    TrendComponent.prototype.updateChart = function () {
        for (var date in this.data["Monthly Time Series"]) {
            if (this.i === 0) {
                this.character = (date.charAt(5) == "0") ? date.charAt(6) : date.charAt(5) + date.charAt(6);
                console.log(this.character);
            }
            this.i++;
            this.closingNumbers.push(this.data["Monthly Time Series"][date]["4. close"]);
            if (this.i === this.months) {
                break;
            }
        }
        this.closingNumbers = this.closingNumbers.slice(0, 12).reverse();
        this.lineChartData = [{ data: this.closingNumbers, label: 'Series A' }];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        for (var k = 0; k < this.character; k++) {
            this.lineChartLabels.push(this.lineChartLabels.shift());
        }
    };
    TrendComponent.prototype.onSearch = function () {
        var _this = this;
        this._stockservice.getData(this.abbreviation)
            .subscribe(function (response) {
            _this.i = 0;
            _this.closingNumbers = [];
            _this.data = null;
            _this.data = response;
            _this.updateChart();
        });
    };
    TrendComponent = __decorate([
        core_1.Component({
            selector: 'app-trend',
            templateUrl: './trend.component.html',
            styleUrls: ['./trend.component.scss']
        })
    ], TrendComponent);
    return TrendComponent;
}());
exports.TrendComponent = TrendComponent;
