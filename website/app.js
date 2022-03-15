/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const apiKey = "8c7ddf3770b4a5f183f3b5cb06ad45a7";
const url = `https://api.openweathermap.org/data/2.5/weather?zip=${ zipCode }&appid=${ apiKey }&units=imperial`; // testing zip code: 94040

