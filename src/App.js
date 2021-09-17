import React from "react";

import Titles from "./modules/Titles/Titles"
import Form from "./modules/Form/Form"
import Weather from "./modules/Weather/Weather"

const API_KEY = "8c631c0f8f87e28e2e7e0f76e0b3ce09"

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    wind: undefined,
    wind_deg: undefined,
    error: undefined
  }
  //
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&mode=json&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    console.log(data);

    if (city) {
      this.setState({
        temperature:data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        wind: data.wind.speed,
        wind_deg: data.wind.deg,
        error: ""
      });
    }
    else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        wind: undefined,
        wind_deg: undefined,
        error: "Please enter a valid Location"
      });
    }
  }

  render (){
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-6 title-container">
                  <Titles />
                </div>
                <div className="col-6 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  wind={this.state.wind}
                  wind_deg={this.state.wind_deg}
                  error={this.state.error}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
