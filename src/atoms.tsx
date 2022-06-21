import { atom } from "recoil";
import { WiCloud, WiDayCloudy, WiDaySunny } from "react-icons/wi";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}

interface ITrash {
  id: number;
  text: string;
}

interface IWeather {
  [key: string]: string;
}

export const toDoState = atom<IToDoState>({
  // key: `${datesState}`,
  key: "toDo",

  default: {
    "To Do": [],
    Doing: [],
    Done: [],
  },
});

export const trashState = atom<ITrash[]>({
  key: "Trash",
  default: [],
});

export let weatherState = atom({
  key: "weather",
  default: {
    "clear sky": "WiDaySunny",
    "few clouds": "WiDayCloudy",
    "scattered clouds": "WiCloud",
    "broken clouds": "WiCloudy",
    "shower rain": "WiRain",
    rain: "WiDayRainMix",
    thunderstorm: "WiThunderstorm",
    snow: "WiSnow",
    mist: "WiFog",
    "01n": "WiNightSunny",
    "02n": "WiNightCloudy",
    "03n": "WiCloud",
    "04n": "WiCloudy",
    "09n": "WiRain",
    "10n": "WiNightRainMix",
    "11n": "WiThunderstorm",
    "13n": "WiSnow",
    "50n": "WiFog",
  },
});
