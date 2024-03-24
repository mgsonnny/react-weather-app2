import React from 'react'
import { Button } from 'react-bootstrap';
// import {handleCityChange} from App.js;

const WeatherButton = ({cities, handleCityChange, selectedCity}) => {
  console.log("cities?", cities)
  return (
    <div className='menu-container'>
      <Button variant={`${selectedCity == "" ? "outline-warning" : "warning"}`} className="button-style" onClick={()=>handleCityChange("current")}>Current Location</Button>
      {/* <Button variant="warning">Hanoi</Button>{' '}
      <Button variant="warning">Paris</Button>{' '}
      <Button variant="warning">NewYork</Button>{' '}
      <Button variant="warning">ChangWon</Button>{' '} */}

      {cities.map((city)=>(
        <Button variant={`${selectedCity == city ? "outline-warning" : "warning"}`} className="button-style"  onClick={()=>handleCityChange(city)}>{city}</Button>
      ))}
    </div>
  )
}

export default WeatherButton
