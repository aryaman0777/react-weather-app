import React, {useState,useEffect } from 'react';
import './Weather.css';



function Weather() {
    const [searchValue, setSearchValue] = useState("kolkata"); //location
    const [data, setData] = useState({}); //data

    const getWeatherInfo = async () => {
        try {
          let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_SECRET_KEY}`;
    
          let res = await fetch(url);
          let data = await res.json();
    
          setData(data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getWeatherInfo();
      }, []);



    let sec =data.sys ?data.sys.sunset.toFixed(): null;
    let date = new Date(sec * 1000);
    let timeStr = `${date.getHours()}:${date.getMinutes()}`;
    

    var iconcode = data.sys?data.weather[0].icon: null;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    

    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type="search" placeholder='search...' autoFocus id='search' className='searchCity' value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                    <button className='searchBtn' type='button' onClick={getWeatherInfo} >Search</button>
                </div>
            </div>
            
            {/*here cities weather info will be shown */}
            < article className='widget' >
                <div className='weatherIcon'>
                    <img id="wicon" src={iconurl} alt="Weather"/> 
                </div>
                {(typeof data.main != "undefined") ? (
                    <>                       
                        <div className='weatherInfo'>
                            <div className='temperature'>
                                <span>{data.main.temp}&deg;C</span>
                            </div>
                            <div className='description'>
                                <div className='weatherCondition'>{data.weather[0].main}</div>
                                <div className='place'>{data.name},{data.sys.country}</div>
                            </div>
                        </div>
                    </>
                       
                ):('')}
                <div className='date'>{new Date().toLocaleString()}</div>
                
                {/*our 4 section info*/}
                <div className='weather-stat'>
                    <div className='temp-info-minmax'>
                        <div className='two-section'>
                            <p>
                                <i className='wi wi-sunset'></i>
                            </p>
                            <p className='info-leftside'>
                                {data.main?<span className='bold'>{timeStr}PM</span>:null} <br/>
                                Sunset
                            </p>
                        </div>

                        <div className='two-section'>
                            <p>
                                <i className='wi wi-humidity'></i>
                            </p>
                            <p className='info-leftside'>
                                {data.main ? <span className='bold'>{data.main.humidity}%</span> : null}<br />
                                Humidity
                            </p>
                        </div>
                    </div>

                    <div className='weather-info'>
                        <div className='two-section'>
                            <p>
                                <i className='wi wi-rain'></i>
                            </p>
                            <p className='info-leftside'>
                                {data.main ? <span className='bold'>{data.main.pressure}%</span> : null}<br />
                                Pressure
                            </p>
                        </div>

                        <div className='two-section'>
                            <p>
                                <i className='wi wi-strong-wind'></i>
                            </p>
                            <p className='info-leftside'>
                               {data.wind ? <span className='bold'>{data.wind.speed.toFixed()} MPH</span> : null}<br />
                                Speed
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
export default Weather;