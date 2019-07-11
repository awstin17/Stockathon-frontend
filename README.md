![Clarity](logo.png)

# Stockathon

Stockathon allows users to track stocks they care about and look up trends for new stocks they want to keep tabs on. All stock information is gathered using the [Alpha Vantage stock API](https://www.alphavantage.co/). 

Getting started
----------------------------------

Stockathon is an Angular project using typescript. The backend API uses MongoDB as a data source for a loopback api server. The corresponding backend server can be found at: 

```
https://github.com/awstin17/Stockathon-backend
```

### Installation

#### Prerequisites: 

Please install Angular-CLI by following [these instructions](https://github.com/angular/angular-cli#installation). Please make sure to install at least Node  version 8.11.2 and NPM version 5.6 and Angular-cli version 6.0.8. 

Clone the remote repository

```
git clone https://github.com/awstin17/Stockathon-frontend.git
```

From within the `stockathon-frontend` directory, run `npm install` to install all dependencies.

```
npm install
```

Once that completes, use `ng serve` to get a local copy running
and voila! There should now be an instance of the app on:

```
http://localhost:4200/
```
Just open a web browser and copy and paste that in to view.

## Branches

The most important branch is `master` on this project. This will always be the latest released version of the app. It is also the branch whose build is hosted for you to demo [here](https://stockathon.netlify.com) on Netlify.

## Built With

* [Angular](https://angular.io/)
* [MongoDB](https://www.mongodb.com/)
* [Loopback](http://loopback.io/)
* [Ng2-Charts](https://valor-software.com/ng2-charts/)
