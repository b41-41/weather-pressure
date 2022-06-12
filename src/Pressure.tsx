import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Information from './Information';

type WeatherProp = {
  pressure: number;
};

type LocationProp = {
  latitude: number;
  longitude: number;
};

type LocalStorageSpace = 'weather' | 'date' | 'location';

const Pressure = () => {
  const [pressure, setPressure] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();
  const thisDate = today.getDate();
  const thisHours = today.getHours();
  const thisYMDH = `${thisYear}${thisMonth}${thisDate}${thisHours}`;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      () => {
        setLatitude(37.5666805);
        setLongitude(126.9784147);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      if (loadLocalStorage('date')) {
        const localYMDH = loadLocalStorage('date');
        if (thisYMDH === localYMDH) {
          //로컬 데이터 그대로 삽입
          const weatherStorage = loadLocalStorage('weather');
          setPressure(weatherStorage.pressure);
          console.log('기존 데이터가 있습니다.');
        } else {
          //시간 업데이트
          saveDate();
          //장소 업데이트
          saveLocation();
          //날씨 정보 추가
          saveWeather(latitude, longitude);
          console.log('날씨 정보가 업데이트되었습니다.');
        }
      } else {
        //로컬 데이터가 없을 때
        //시간 추가
        saveDate();
        //장소 추가
        saveLocation();
        //날씨 추가
        saveWeather(latitude, longitude);
        console.log('날씨 정보가 새로 추가되었습니다.');
      }
    }
  }, [latitude, longitude]);

  const saveWeather = async (lat?: number, lon?: number) => {
    //데이터를 받아서 세이브
    try {
      if (lat && lon) {
        //매개 변수가 모두 들어왔을 때만 작동
        const { data: response } = await axios.get(
          'https://api.openweathermap.org/data/2.5/onecall',
          { params: { lat, lon, appid: process.env.REACT_APP_APPID } }
        );
        saveWeatherLocalstorage(response.current.pressure);
        setPressure(response.current.pressure);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveWeatherLocalstorage = (pressure: number): void => {
    saveLocalStorage('weather', { pressure });
  };

  const saveLocation = (): void => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        saveLocalStorage('location', { latitude, longitude });
      },
      () => {
        saveLocalStorage('location', {
          latitude: 37.5666805,
          longitude: 126.9784147,
        });
      }
    );
  };

  const saveDate = (): void => {
    saveLocalStorage('date', thisYMDH);
  };

  const saveLocalStorage = (
    space: LocalStorageSpace,
    content: WeatherProp | LocationProp | string
  ) => {
    if (space === 'date') {
      localStorage.setItem(space, String(content));
    } else {
      localStorage.setItem(space, JSON.stringify(content));
    }
  };

  const loadLocalStorage = (space: string) => {
    const content = localStorage.getItem(space);
    if (content) {
      if (space === 'date') {
        return content;
      }
      return JSON.parse(content);
    }
    return;
  };

  return <Information pressure={pressure} />;
};

export default Pressure;
