# CryptoLive

### Web application for tracking cryptocurrency prices

The goal of this project is to implement web application that serves as a user interface for tracking cryptocurrency prices.

This repository contains only source code related to the web application. 
Additional RESTful API web service is responsible for managing and storing user's data in database 
and redirecting data related to cryptocurrencies from external sources 
can be found in the following repository https://github.com/michalkoziara/crypto-live-service.

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Getting Started

These instructions will get you a copy of the project up and running on 
your local machine for development and testing purposes.

### Prerequisites

* Node.js [15.5.0 or above] - https://nodejs.org/
* npm [7.3.0 or above] - https://www.npmjs.com/

Detailed information about installation and configurations are provided at developers' site.

## Technology Stack

* React.js [17.0.1]
* TypeScript
* Material-UI
* ApexCharts
* JSON Web Token
* axios
* yup
* formik

### Build 

A step by step instruction [on Windows 10]:
* Navigate to project directory in Command Prompt (cmd).
* Use ``npm`` to start the application.
  ```
  npm start
  ```

The application should be running, you can check that by visiting http://localhost:3000/ in your browser.

In order to access all functionalities of the application you should also start the web service.
Detailed information about can be found in the following repository https://github.com/michalkoziara/crypto-live-service.

Please notice that by default the application is proxied to port 8080 to maintain connection with the web service with disabled CORS mechanism.

## Author

* **Michał Koziara** 
