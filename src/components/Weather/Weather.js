import React, {useState, useEffect} from 'react'
import { Button, Card } from 'react-bootstrap';
import classes from "../Weather/style.css";

const Weather = (props) => {



    const [currentWeather, setCurrentWeather] = useState(props);
    const [weatherDate, setWeatherDate] = useState("");
    const [tempature, setTempature] = useState("");
    const [weather, setWeather] = useState("");

    useEffect(() => {
        setCurrentWeather(props.weatherData);

        setWeatherDate(convertUnix(props.weatherData.dt));
        setTempature(props.weatherData.feels_like);
        setWeather(props.weatherData.weather[0]);
        //console.log(tempature.day)
       
        //console.log("--------",tempature);
    },[])

    //convert unix to a user friendly date 
    function convertUnix(unix){
 
        var date = new Date(unix*1000);
        // Months array
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        //Month
        var month = months_arr[date.getMonth()];
       // Day
        var day = date.getDate();

        var convdataTime = month+'-'+day;

        return convdataTime
    }

    return (
        <div >
           <Card className="rcorners1" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`http://openweathermap.org/img/w/${weather.icon}.png`} />
             <Card.Body>
          <Card.Title>{ weatherDate}</Card.Title>
          <Card.Text>
              Forcast: {weather.main}<br/> 
              Description: {weather.description} <br/>
                Day: {tempature.day}<br/>
                Night: {tempature.night}<br/>
                
               
          </Card.Text>

          
          
         </Card.Body>
        </Card>
        </div>
    )
}

export default Weather
