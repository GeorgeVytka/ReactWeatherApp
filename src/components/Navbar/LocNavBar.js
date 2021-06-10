import React, { useState} from 'react'
import { Button , Navbar, Nav, Form, FormControl,Row, Col} from 'react-bootstrap';
const LocNavBar = ({location}) => {

    /* 
    const [location, setLocation] = useState({
       coordinates: {lat:"", lng:""}
    });
*/

    const onSuccess = (location) => {
        location({
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        })

        console.log(location)
    };

    const onError = (error) => {
        {console.log(error)}
    }

    const getUserLocation = (e) => {
        e.preventDefault();
        if( !("gelocation" in navigator)){
            {console.log("error")}
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    return (
        <>
      


      <Navbar bg="dark" variant="dark">
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



    <Form>
  <Row>
    <Col>
      <Form.Control placeholder="First name" />
    </Col>
    <Col>
    <Button type="submit">Submit</Button>
    <Button onClick={getUserLocation} type="submit">Location</Button>
    </Col>
  </Row>
</Form>


  </Navbar>





      
      </>
    )
}

export default LocNavBar
