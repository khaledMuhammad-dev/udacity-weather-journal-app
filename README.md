# udacity-weather-journal.herokuapp.com

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

This project for learning purpose.

FWD scholarship<br/>
[![FWD logo](/assets/fwd-egypt.jpg "fwd logo")](https://egfwd.com/)

Udacity platform<br/>
[![Udacity logo](/assets/udacity.jpg "udacity logo")](https://www.udacity.com/)

### ✨ Preview:
project link [Weather Journal app ☁](https://udacity-weather-journal.herokuapp.com/) 

#### Usage: 
- Zipcode 
  - Required
  - acceept numbers Only 
  - Must be 5 digits
- Textbox
  - Required

# Project's Setup

## Environment Setup

| Criteria                     | Meets Specifications                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------|
| Node and Express Environment | Node and Express installed on the local machine.                                                |
| Project Dependencies         | cors and body-parser installed on the local machine, and included in the project.               |


## APIs and Routes (server)

| Criteria             | Meets Specifications                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| APP API Endpoint     |  JavaScript Object named `projectData` to act as the app API endpoint.                                  |
| GET Route            | `/all` to response with the endpoint data.                                                              |
| POST Route           | `/add` to add (in this case to update) the endpoint data.                                               |


## APIs and Routes (client)

| Criteria             | Meets Specifications                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| GET Request          | `api.openweathermap.org` fetch the data from OpenWeatherMap API.                                        |
| POST Request         | `/add` to add temperature, content, date to the endpoint data.                                          |
| GET Reques           | `/all` to fetch the most recent data and update the UI.                                                 |


### Solution
Implement async calling by the use of promise chaining where the mix of API and user responses will be passed , to POST endpoint on server side.