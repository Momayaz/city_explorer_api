'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;


app.get('/location', (req,res)=>{
    let city = req.query.city;
    let locationData = require('./data/location.json');
    let information = locationData[0];
    let locationObject = new LocationInfo(city, information.display_name, information.lat, information.lon);
    res.status(200).json(locationObject);
})

function LocationInfo(search_query, formetted_query, letitude,longitude){
    this.search_query = search_query;
    this.formetted_query = formetted_query;
    this.letitude = letitude; 
    this.longitude = longitude;
}

function Weather(forcast,time){
    this.forcast = forcast;
    this.time = time;
}
app.get('/weather', (req,res)=>{
   
    const weatherData = require('./data/weather.json');
    let weatherInfo = [];
    weatherData.data.forEach(element => {
        let info = element.weather.description;
        let time = element.datetime;
        weatherInfo.push(new Weather(info,time));
    });
    let weatherObject = new Weather(weatherInfo);
    res.status(200).json(weatherObject);
    handlerError(res);
})

app.use('*', (req,res)=>{
    res.status(404).send('something worng, try again')
})

app.listen(PORT, ()=>{
    console.log(`Momayaz, app is listening to ${PORT}`)
})

function handlerError(res){
    if(res === 500){
        res.status(500).send('Sorry, something went wrong')
    }
}


























// const express = require('express');
// const cors = require('cors');

// require('dotenv').config();

// const app = express();
// app.use(cors());
// const PORT= process.env.PORT;


// app.get('/location', (req,res)=>{
//     let city = req.query.city;
//     let getJson = require('./data/location.json');
//     let jsonObject = getJson[0];
//     let locationObject = new LocationFunc(city, jsonObject.display_name, jsonObject.lat, jsonObject.lon);
//     res.status(200).json(locationObject);

// })

// function LocationFunc(search_query, formetted_query, letitude, longitude){
//     this.search_query = search_query;
//     this.formetted_query = formetted_query;
//     this.letitude = letitude; 
//     this.longitude = longitude;
// }

// app.listen(PORT, ()=>{
//     console.log(`app is lestening to ${PORT}`)
// })