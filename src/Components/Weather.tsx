import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  WiCloud,
  WiCloudy,
  WiDayCloudy,
  WiDayRain,
  WiDayRainMix,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiDayThunderstorm,
  WiFog,
  WiHot,
  WiRain,
  WiRainMix,
  WiSnow,
  WiSnowflakeCold,
  WiThunderstorm,
} from "react-icons/wi";
import { useRecoilState } from "recoil";
import { weatherState } from "../atoms";
import { useQuery } from "react-query";
import { fetchHolidays } from "../api";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 15px;
`;

const Container = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: space-between;
  padding: 0 30px;
  padding-top: 20px;
`;

const Icon = styled.span`
  svg {
    box-sizing: content-box;
    width: 36px;
    height: 36px;
    vertical-align: top;
    padding: 0 10px;
  }
`;

const Location = styled.span`
  font-size: 18px;
  text-align: right;
`;

const Temperature = styled.span<{ temp: number | undefined }>`
  font-size: 28px;
  color: ${(props) =>
    props.temp! >= 30 ? "#f78fb3" : props.temp! <= 5 ? "#2bcbba" : "white"};
`;

const WeatherBox = styled.div``;

interface ITemp {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

function Weather() {
  const [coords, setCoords] = useState();
  const [temp, setTemp] = useState<ITemp>();
  const [weather, setWeather] = useState<IWeather>();
  const [name, setName] = useState("");

  const WEATHER_API_KEY = "aa0e3fd16c9e2ed8ed253b5986b3ce7a";
  function handleSuccess(position: any) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const coordsObj = {
      lat,
      lon,
    };

    getWeather(lat, lon);
  }
  function handleError() {
    console.log("Error");
  }
  function requestCoords() {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }
  const getWeather = async (lat: number, lon: number) => {
    const json = await (
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      )
    ).json();
    setWeather(json.weather[0]);
    setTemp(json.main);
    setName(json.name);
  };

  const getIcon = () => {
    let icon = weather?.description;
    switch (icon) {
      case "clear sky":
        return <WiDaySunny />;
      case "few clouds":
        return <WiDayCloudy />;
      case "scattered clouds":
        return <WiCloud />;
      case "broken clouds":
        return <WiCloudy />;
      case "overcast clouds":
        return <WiDaySunnyOvercast />;
      case "shower rain":
        return <WiRain />;
      case "rain":
        return <WiDayRainMix />;
      case "light rain":
        return <WiRainMix />;
      case "thunderstrom":
        return <WiThunderstorm />;
      case "snow":
        return <WiSnow />;
      case "fog":
        return <WiFog />;
    }
  };

  useEffect(() => {
    requestCoords();
  }, []);

  return (
    <Wrapper>
      <Container>
        <WeatherBox>
          <Icon>{getIcon()}</Icon>
          <Temperature temp={temp?.temp}>{temp?.temp}°</Temperature>
        </WeatherBox>
        <Location>@{name}</Location>
      </Container>
    </Wrapper>
  );
}

export default Weather;
