import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Button , Container, Row, Col,Navbar,FormControl ,Nav, Form} from 'react-bootstrap';
import LocNavBar from '../Navbar/LocNavBar';
import Weather from '../Weather/Weather';
const MainWaether = () => {

  
    const [location, setLocation] = useState({
        coordinates: {lat:"", lng:""}
     });
     const [toggleSearchType, setToggleSearchType] = useState(false);
     const [city, setCity] = useState("");
    
     const [showWeatherdata, setShowWeatherdata] = useState(false);
     
      let baseURL;
      let cityURL;
    const apiKey = '5b481ccb86273b4726145e5371a6107c';

     // get and store the 7 day forcast
     const[userWeather, serUserWeather] = useState("name");

    const fecthWeather = async () => {
       // console.log(location.coordinates.lng);
      
     
        
baseURL = ` https://api.openweathermap.org/data/2.5/onecall?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&units=imperial&exclude=hourly,minutely,&appid=`

        

        

      try {
          const weatherData = await axios.get(baseURL + apiKey);
          serUserWeather(weatherData.data.daily);
         
        // console.log("---", weatherData.data);
        
         getCityName()
          setShowWeatherdata(true);
        
      } catch (error) {
          console.log(error);
      }
    }



    const getCityName = async () => {

      let cityURL = `https://us1.locationiq.com/v1/reverse.php?key=pk.98d1b7e7e8809bf457dc2448d824c3fb&lat=${location.coordinates.lat}&lon==${location.coordinates.lng}&format=json`
      //console.log("----",cityURL);
      try {
        const cityData = await axios.get(cityURL)
        setCity(cityData.data.address.city);
       
      console.log("---", cityData.data.address.city);
      } catch (error) {
        console.log(error)
      }
    }


    const onSuccess = (location) => {
        setLocation({
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        })

       
        fecthWeather();
    };

    const onError = (error) => {
        {console.log(error)}
    }



/*

*/
    const handleSubmit = async (e) => {
      e.preventDefault();
    cityURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
      const cityLat = await axios.get(cityURL);

     setLocation({
      coordinates: {
        lat: cityLat.data[0].lat,
        lng: cityLat.data[0].lon,
    },
     })
     
     setCity(cityLat.data[0].name);
     console.log(cityLat.data[0].name);
     
     fecthWeather();
     
  } catch (error) {
      console.log(error);
  }
}

    

   

    const getUserLocation =  (e) => {

        e.preventDefault();
     
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

useEffect(() => {
  //solves an error i have no idea how to fix
  navigator.geolocation.getCurrentPosition(onSuccess2, onError2);
},[])

const onSuccess2 = (location) => {
  

 
  fecthWeather();
};

const onError2 = (error) => {
  {console.log(error)}
}


    return (

        <>
<Navbar inline bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      
    </Nav>
    <Form inline className='d-flex'  onSubmit={handleSubmit}>
      <FormControl placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value) }/>
      <Button  type="submit" >Submit</Button>
      <Button onClick={getUserLocation} type="submit">Location</Button>
    </Form>
  </Navbar>

      {/* <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src="/logo.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      React Bootstrap
    </Navbar.Brand>



    <Form  inline onSubmit={handleSubmit}>
     
      <Form.Group controlId="formCity">
 
   
      <Form.Control placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value) } />
   
   
    <Button  type="submit" >Submit</Button>
   
   
  
  </Form.Group> 
  <Button onClick={getUserLocation} type="submit">Location</Button>
  
  
</Form>


  </Navbar>  */}


        <div>
          <h1>{city}</h1>
        </div>
        
            <Container fluid="md">

            <Row className="justify-content-md-center">
      
        
       {showWeatherdata ? 
      userWeather.map(index =>(  <Col m={4}> 
        <Weather key={index.dt} weatherData={index}  /> </Col>)) : <h1>Sign in</h1>    }
        
     
       
  
  
  </Row>

           </Container>
           
           </>
        
    )
}

export default MainWaether
