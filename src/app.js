const geocode = require('../utilities/geocode');
const forecast = require('../utilities/forecast');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000

const path = require('path');
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath =  path.join(__dirname,'../templates/partials');

app.use(express.static(publicDirectoryPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); 

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Koushik'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Koushik'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page',
        message: 'I will not help',
        name: 'Koushik'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            Error: 'Please provide the address'
        });
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                Error: error
            })
        }
        forecast(latitude,longitude,(error,{temperature, feelslike, humidity}={})=>{
            if(error){
                return res.send({
                    Error: error
                })
            }
            res.send({
                    Place: location, 
                    forecast: 'It is currently '+temperature+' degrees out. It feels like '+feelslike +' degrees out.',
                    humidity: humidity+' percent'
                })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('help 404',{
        title: 'Help 404 page',
        message: 'Help Page not fund',
        name: 'Koushik',
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 page',
        message: 'Page not fund',
        name: 'Koushik',
    })
})

app.listen(port,()=>{
    console.log('Server is up and listening on port '+port);
})