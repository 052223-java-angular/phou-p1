# Yield - A P&L generator for your trades

## Introduction

Yield is an web application that allows a user to upload a .csv file of their trades and generate a profit and loss .csv report. In addition to generating a
.csv report, the user can view the generated results within a web-browser like Chrome.

As part of the integration, yield will utilize the Coinmarketcap or similar API to extract past and current price data of crypto assets for calculating figures.

Although the app is free to use, yield may also integrate the Coinbase API for accepting crypto payment / donations for those feeling the need to donate some of
those Gainz!

## FE User Stories

- **As a user**, I do not want to register for an account in order to generate a report. (Initial uploads are processed locally / within FE, so will spam
  uploads matter?)
- **As a user**, I may want to donate for this service after seeing my gains, so I want to be able to send and / or donate using cryptocurrency.
- **As a user**, I want to be able to register and login, so I can save my report and retrieve those reports at a later time.
- **As a user**, I want to be able to upload a .csv of my trades and view a p&l report.
- **As a user**, I want to be able to view and query my reports by asset, date, amount, etc.
- **As a user**, I want to be able to save my p&l report.

## MVP (Minimum Viable Product)

- User can register for an account
- User can securely login and authenticate with a jwt-token
- User can parse a .csv file of trade history
- User can send the .csv file contents to an api endpoint
- User can select or add header columns so that each column can be identified, (i.e. buy date, sell date, buy qty, sell qty, buy value, sell value, buy fee,
  sell) fee
- User can update their profile
- User can fetch and view their trading data and history from an api endpoint
- User can fetch and modify their trade data and history from an api endpoint
- User can retrieve and view their trade data receievd from an api endpoint
- User can retrieve and view crypto asset data receievd from an api enpoint
- User can retrieve crypto price data receievd from an api endpoint
- User can view a profit & loss report
- User can generate a P&L report in .csv format

## Stretch Goals

- Implementing the Coinbase API for accepting / making donations / payment by crypto
- Add portfolio manager and enhance the UI with charts, graphs and analytical data of an asset
- Implementing trading view api for showing charts of supported assets
- Add 3rd party signup options, e.g. Google

## Tech Stack

### **Front-end tech stack**

- **Angular**: A javascript framework for creating the UI
- **Tailwind CSS**: CSS library for styling the UI
- **PapaParse**: A .csv parser
- **Npm**: A package manager for managing dependencies
- **Jasmine, Karma**: Testing libraries

## Requirements

- **Clean Codebase**: All code should be clean and well-documented. The repository should not include any unnecessary files or folders such as the `target/`,
  `.DS_Store`, etc. All files and directories should be appropriately named and organized.

- **Secure**: The application should not display any sensitive information in error messages.

- **Error Handling**: The application should handle potential errors gracefully and provide clear and helpful error messages to the users.

- **Testing**: The application should have a high test coverage. Unit tests and integration tests should be implemented using Jasmine and Karma.

- **Version Control**: The application should be developed using a version control system, preferably Git, with regular commits denoting progress.

- **Documentation**: The repository should include a README file with clear instructions on how to run the application. Code should be well-commented to allow
  for easy understanding and maintenance.

- **Scalable**: The design of the application should be scalable, allowing for easy addition of new features or modifications in the future.
