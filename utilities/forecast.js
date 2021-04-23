const request = require("request");

const forecast = (lalitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=04925240ae85bf01bb83452c5fc24fa5&query='+encodeURIComponent(lalitude)+','+encodeURIComponent(longitude);
    request({ url , json: true }, (error,{ body })=>{
          if(error){
            callback('Not able to connect',undefined);
        }else if(body.error){
            callback('Not able to find the location',undefined);
        }else{
            callback(undefined,{
                temperature: body.current.temperature, 
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            });
        }
    })
}



module.exports = forecast;
