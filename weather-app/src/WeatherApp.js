import React, { useState } from 'react';

import styled  from '@emotion/styled';
import { ReactComponent as CloudyIcon } from './images/cloudy.svg';
import { ReactComponent as AirFlowIcon } from './images/airFlow.svg';
import { ReactComponent as RainIcon } from './images/rain.svg';
import { ReactComponent as RedoIcon } from './images/redo.svg';

const Container = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  background-color: #f9f9f9;
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: #212121;
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: #828282;
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: #757575;
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const Cloudy = styled(CloudyIcon)`
  flex-basis: 30%;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: #828282;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Redo = styled(RedoIcon)`
  width: 15px;
  height: 15px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
`;

const WeatherApp = () => {

  const [currentWeather, setCurrentWeather] = useState({
    observationTime: '2019-10-02 22:10:00',
    locationName: '臺北市',
    description: '多雲時晴',
    temperature: 27.5,
    windSpeed: 0.3,
    humid: 0.88,
  });

  const handleClick = () => {
    fetch(
      'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-1EE18F52-CEEE-4E31-9B60-4DCBEC8C9AF3&locationName=臺中'
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        const locationData = data.records.location[0];
        
        let TEMP = null
        let WDSD = null
        let HUMD = null
        let Weather = null

        for (let i = 0; i < locationData.weatherElement.length; i++) {
          if (locationData.weatherElement[i].elementName === 'TEMP') {
            TEMP = locationData.weatherElement[i].elementValue;
          }
          if (locationData.weatherElement[i].elementName === 'WDSD') {
            WDSD = locationData.weatherElement[i].elementValue;
          }
          if (locationData.weatherElement[i].elementName === 'HUMD') {
            HUMD = locationData.weatherElement[i].elementValue;
          }
          if (locationData.weatherElement[i].elementName === 'Weather') {
            Weather = locationData.weatherElement[i].elementValue;
          }
        }
        // STEP 3：要使用到 React 組件中的資料
        setCurrentWeather({
          observationTime: locationData.time.obsTime,
          locationName: locationData.locationName,
          description: Weather,
          temperature: TEMP,
          windSpeed: WDSD,
          humid: HUMD,
        });
        
      });
  };

  return (
    <Container>
      <WeatherCard>
        <Location>{currentWeather.locationName}</Location>
        <Description>
          {currentWeather.observationTime}
          {' '}
          {currentWeather.description}
          </Description>
        <CurrentWeather>
          <Temperature>
          {currentWeather.temperature} <Celsius>°C</Celsius>
          </Temperature>
          <Cloudy />
        </CurrentWeather>
        <AirFlow>
          <AirFlowIcon />
          {currentWeather.windSpeed}m/h
        </AirFlow>
        <Rain>
          <RainIcon />
          {currentWeather.humid * 100}%
        </Rain>
        <Redo onClick={handleClick} />
      </WeatherCard>
    </Container>
  );
};

export default WeatherApp;