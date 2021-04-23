const request = require('request');

const geocode = (address,callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia291c2lra2lyYW4iLCJhIjoiY2tucHNiaXpqMXM1djJvbnhxcmg2aDQ2byJ9.OGhGJHfYMPK6YXSduz524g&limit=1';
    request({ url, json: true },(error,{ body })=>{
        if(error){
            callback('Not able to connect',undefined);
        }else if(body.message|| body.features.length ===0){
            callback('Not able to find the location',undefined);
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}


module.exports = geocode;