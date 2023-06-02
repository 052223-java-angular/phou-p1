# Yield - A P&L generator for your trades

## Introduction

Yield is an web application that allows a user to upload a .csv file of their trades and generate a profit and loss .csv report.In addition to generating a .csv
report, the user can view the generated results within a web-browser like Chrome.

As part of the integration, yield will utilize the Coinmarketcap or similar API to extract past and current price data of crypto assets for calculating figures.

While the app is free to use, yield may also integrate the Coinbase API for accepting crypto payment / donations for those feeling the need to donate some of
those Gainz!

## User Stories

- **As a user**, I do not want to be forced to register for an account in order to generate a report.
- **As a user**, I may want to donate for using the service, so I want to be able to send and donate using cryptocurrency.
- **As a user**, I want to be able to register and login, so I can save my reports and retrieve those reports at a later time.
- **As a user**, I want to be able to upload a .csv of my trades and generate a p&l report.
- **As a user**, I want to be able to view and query my reports by asset, date, amount, etc.
- **As a user**, I want to be able to view the results before generating a report.

## MVP (Minimum Viable Product)

- User registration and login via jwt authentication
- Uploading .csv file of trade history
- Generating a .csv P&L report
- Viewing and modifing entries of P&L report via Web UI
- Extracting cryptocurrency prices from coinmarket or other API

## Stretch Goals

- Implementing the Coinbase API for accepting / making payment by crypto
- Enhancing the UI by adding charts, graphs, etc.
- Add 3rd party signup options, e.g. Google

## Tech Stacks

### **Front-end tech stack**

- **Angular**: A javascript framework for creating the UI
- **Tailwind CSS** CSS library for styling the UI
- **Npm**: for managing dependencies

### **Back-end tech stack**

- **Java**: The main programming language used for building the application.
- **PostgreSQL**: Used as the database to store user reports and cryptocurrency related data.
- **JDBC (Java Database Connectivity)**: An API for connecting and executing queries on the database.
- **Maven or Gradle**: Used for managing project dependencies.
- **BCrypt**: A Java library for hashing and checking passwords for security.
- **Log4j**: A logging utility for debugging purposes.
- **JUnit**: A testing framework for Java applications, used to ensure our code works as expected.
- **JUnit, Mockito, and PowerMock**: Used for unit and integration testing.
- **Git and GitHub**: Used for version control.

## Requirements

- **Clean Codebase**: All code should be clean and well-documented. The repository should not include any unnecessary files or folders such as the `target/`,
  `.DS_Store`, etc. All files and directories should be appropriately named and organized.

- **Database Design**: The database should be designed following the principles of the 3rd Normal Form (3NF) to ensure data integrity and efficiency. An Entity
  Relationship Diagram (ERD) should be included in the documentation.

- **Secure**: All sensitive user data such as passwords must be securely hashed before storing it in the database. The application should not display any
  sensitive information in error messages.

- **Error Handling**: The application should handle potential errors gracefully and provide clear and helpful error messages to the users.

- **Testing**: The application should have a high test coverage. Unit tests and integration tests should be implemented using JUnit, Mockito, and PowerMock.

- **Version Control**: The application should be developed using a version control system, preferably Git, with regular commits denoting progress.

- **Documentation**: The repository should include a README file with clear instructions on how to run the application. Code should be well-commented to allow
  for easy understanding and maintenance.

- **Scalable**: The design of the application should be scalable, allowing for easy addition of new features or modifications in the future.
