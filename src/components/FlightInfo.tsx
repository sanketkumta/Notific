import React from 'react';
import styled from 'styled-components';
import { Plane, Clock, MapPin, Gauge } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Container = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  color: white;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FlightNumber = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const FlightPhase = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
`;

const RouteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Location = styled.div`
  text-align: center;
  flex: 1;
`;

const LocationCode = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const LocationName = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;

const PlaneIcon = styled.div`
  margin: 0 20px;
  animation: fly 2s ease-in-out infinite alternate;

  @keyframes fly {
    from {
      transform: translateY(-2px);
    }
    to {
      transform: translateY(2px);
    }
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;

const InfoItem = styled.div`
  text-align: center;
`;

const InfoValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  opacity: 0.8;
`;

export function FlightInfo() {
  const { state } = useNotification();
  const { flightInfo } = state;

  const formatTime = (time: string) => {
    return time;
  };

  const formatAltitude = (altitude: number) => {
    return `${altitude.toLocaleString()} ft`;
  };

  return (
    <Container>
      <Header>
        <FlightNumber>Flight {flightInfo.flightNumber}</FlightNumber>
        <FlightPhase>{flightInfo.flightPhase}</FlightPhase>
      </Header>

      <RouteContainer>
        <Location>
          <LocationCode>{flightInfo.origin}</LocationCode>
          <LocationName>
            <Clock size={12} style={{ marginRight: '4px' }} />
            {formatTime(flightInfo.departureTime)}
          </LocationName>
        </Location>

        <PlaneIcon>
          <Plane size={32} />
        </PlaneIcon>

        <Location>
          <LocationCode>{flightInfo.destination}</LocationCode>
          <LocationName>
            <Clock size={12} style={{ marginRight: '4px' }} />
            {formatTime(flightInfo.arrivalTime)}
          </LocationName>
        </Location>
      </RouteContainer>

      <InfoGrid>
        <InfoItem>
          <InfoValue>
            <Gauge size={16} style={{ marginRight: '4px' }} />
            {formatAltitude(flightInfo.currentAltitude)}
          </InfoValue>
          <InfoLabel>Current Altitude</InfoLabel>
        </InfoItem>

        <InfoItem>
          <InfoValue>
            <MapPin size={16} style={{ marginRight: '4px' }} />
            350 mph
          </InfoValue>
          <InfoLabel>Ground Speed</InfoLabel>
        </InfoItem>

        <InfoItem>
          <InfoValue>
            <Clock size={16} style={{ marginRight: '4px' }} />
            2h 15m
          </InfoValue>
          <InfoLabel>Time Remaining</InfoLabel>
        </InfoItem>
      </InfoGrid>
    </Container>
  );
}