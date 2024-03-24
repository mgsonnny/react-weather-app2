import React from 'react'

const WeatherBox = ({weather}) => {
    // console.log("weather?", weather)
  return (
    <div className='weather-box'>
      <h1 className='title'>{weather?.name}</h1>
      <h2 className='temp'>{Math.floor(weather?.main.temp,2)}℃ / {Math.floor(weather?.main.temp*1.8+32,2)}℉</h2>
      <h3 className='description'>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox
