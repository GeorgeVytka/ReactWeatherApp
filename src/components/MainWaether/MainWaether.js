import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Button , Container, Row, Col,Navbar,FormControl ,Nav, Form, Jumbotron} from 'react-bootstrap';
import LocNavBar from '../Navbar/LocNavBar';
import Weather from '../Weather/Weather';
const MainWaether = () => {

  //store latitude and longitude
    const [location, setLocation] = useState({
        coordinates: {lat:0, lng:0}
     });
     
    //store the city name
     const [city, setCity] = useState("");
     
     //boolean if false shows a welcome message, it true shows weather data
     const [showWeatherdata, setShowWeatherdata] = useState(false);
     
      

     // get and store the 7 day forcast
     const[userWeather, serUserWeather] = useState("name");

let baseURL;
      let cityURL;
    const apiKey = '5b481ccb86273b4726145e5371a6107c';


//get the wether of the location the user inputed 
    const fecthWeather = async () => {

baseURL = ` https://api.openweathermap.org/data/2.5/onecall?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&units=imperial&exclude=hourly,minutely,&appid=`
  
cityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        

      try {
         
          const weatherData = await axios.get(baseURL + apiKey)
          .then( function (res) {

             serUserWeather(res.data.daily);
         
            console.log("---", res.data);
            
            // getCityName()
              setShowWeatherdata(true);
          }



           
          )
          
         
        
      } catch (error) {
          console.log(error);
      }
    }



   

//get latitude and longitude from user's location
    const onSuccess = (location) => {
        setLocation({
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        })

       
        //fecthWeather();
    };

    const onError = (error) => {
        {console.log(error)}
    }





/*
Open open weather api requires latitude and longitude
used this api call to reverse geocoding the city by its name
*/
const fecthCityName = async () => {

  
  cityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const cityLat = await axios.get(cityURL)
  .then(function (res) {
    console.log("lat ",res.data[0].lat)
    console.log("lon ",res.data[0].lon)

    console.log("this is the hook", location);

    //set latitude and longitude 
    setLocation({
      coordinates: {
        lat: res.data[0].lat,
        lng: res.data[0].lon,
    },
     })

     console.log("this is the hook", location);

     //call to get 7 day forcast
     fecthWeather();
  }
  
  )
    
  
 

 

}
//handle the button sumbitting
    const handleSubmit =  (e) => {

      e.preventDefault();
     
  fecthCityName ();
   
}

    

   

    const getUserLocation =  () => {

        
     
       

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

useEffect(() => {
  //used this to solve bug i have no idea how to fix
  getUserLocation()
},[])


    return (

        <>
<Navbar inline bg="dark" variant="dark">
    <Navbar.Brand>Weather</Navbar.Brand>
    <Nav className="mr-auto">
      
    </Nav>
    <Form inline className='d-flex'  onSubmit={handleSubmit}>
      <FormControl type="text"
       placeholder="Enter City" 
      value={city} 
      onChange={e => setCity(e.target.value)} />
      <Button  type="submit" >Submit</Button>
    </Form>
  </Navbar>

  


        <Container>
          <Row className="justify-content-center" style={{textAlign: "center"}}>
          <h1>{city}</h1>
          </Row>
        </Container>
        
            <Container fluid="md">

            <Row className="justify-content-md-center">
      
        
       {showWeatherdata ? 
      userWeather.map(index =>(  <Col m={4}> 
        <Weather key={index.dt} weatherData={index}  /> </Col>)) :
        
        
        <Jumbotron fluid className="text-center">
  <h1>Welcome</h1>
  <p>
    Pleace enter your city to get weather information 
  </p>
  
</Jumbotron>    }
        
     
       
  
  
  </Row>

           </Container>
           
           </>
        
    )
}

export default MainWaether
