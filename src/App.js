// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";


//1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
//2. 날씨정보에는 도시, 섭씨, 화씨 날씨 상태
//3. 5개의 버튼이 있다. (1개는 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {

  const [weather,setWeather]=useState(null);
  const [city,setCity]=useState('');
  const [loading,setLoading]=useState(false);
  const [apiError, setAPIError] = useState("");
  // const [handleCityChange,setHandleCityChange]=useState("current")
  const cities=['paris','Changwon','Busan','seoul']

  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      // console.log("현재위치", lat, lon);
      getWeatherByCurrentLocation(lat, lon);
      
    });
  }

  const getWeatherByCurrentLocation=async(lat, lon)=>{
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=11a10d30fd6a645a142151ef78118342&units=metric`
      setLoading(true);
      let response = await fetch(url)
      let data = await response.json()
      setWeather(data);
      setLoading(false);
      // let city = data.name
      // let dTemp = Math.floor((data.main.temp)-273,2)
      // let fTemp = dTemp * 9 / 5 +32
      // let nowWeather = data.weather[0].description
      // console.log("data", data)
      // console.log("city", city)
      // console.log("temp", fTemp)
      // console.log("nowWeather", nowWeather)
    }catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
    
  }

  const getWeatherByCity=async()=>{
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=11a10d30fd6a645a142151ef78118342&units=metric`
      setLoading(true);
      let response = await fetch(url)
      let data = await response.json()
      // console.log("data", data)
      setWeather(data);
      setLoading(false);
    } catch (err){
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  }


  const handleCityChange = (city) => {
    if(city==="current"){
      setCity("");
    }else{
      setCity(city);
    }
  }

  useEffect(()=>{
    if(city==""){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  },[city])

  return (
    <div>
      {loading?(
        <div className="container">
          <ClipLoader
            color='#f88c6b'
            loading={loading}
           //cssOverride={override}
           size={150}
           aria-label="Loading Spinner"
          
          />
        </div>
        ) : (
        <div className="container">
          <WeatherBox weather={weather}/>
          <WeatherButton cities={cities} setCity={setCity} handleCityChange={handleCityChange} selectedCity={city}/>
        </div>
        )}
    </div>
  );
}

export default App;
