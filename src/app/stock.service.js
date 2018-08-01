"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/forkJoin");
var StockService = /** @class */ (function () {
    function StockService(http) {
        this.http = http;
    }
    StockService.prototype.getData = function (abbreviation) {
        return this.http.get("https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" + abbreviation + "&apikey=GGKHZQ2ZXMFO3FAY");
    };
    StockService.prototype.getDailyData = function (stocks) {
        var _this = this;
        return Observable_1.Observable
            .forkJoin(stocks
            .map(function (stock) { return _this.http.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + stock + "&interval=1min&apikey=GGKHZQ2ZXMFO3FAY"); }));
    };
    StockService.prototype.addStockToFavorites = function (stock, id, token) {
        return this.http.post("http://summer-austin-2018-phortonssf.c9users.io:8080/api/appUsers/" + id + "/stocks?access_token=" + token, stock);
    };
    StockService.prototype.getFavorites = function (id, token) {
        return this.http.get("http://summer-austin-2018-phortonssf.c9users.io:8080/api/appUsers/" + id + "/stocks?access_token=" + token);
    };
    StockService = __decorate([
        core_1.Injectable()
    ], StockService);
    return StockService;
}());
exports.StockService = StockService;
