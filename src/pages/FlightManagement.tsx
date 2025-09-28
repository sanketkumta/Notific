import React from 'react';
import styled from 'styled-components';
import { Plane, Clock, MapPin, Navigation, BarChart3 } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #3742fa 0%, #2f3542 100%);
  padding: 20px;
  color: white;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FlightInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin: 12px 0;
`;

const TimeBlock = styled.div`
  text-align: center;
`;

const TimeLabel = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 4px;
`;

const TimeValue = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin: 8px 8px 8px 0;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const StatusBadge = styled.span<{ status: 'ontime' | 'delayed' | 'boarding' }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  background: ${props => {
    switch (props.status) {
      case 'ontime': return '#2ed573';
      case 'delayed': return '#ff6b35';
      case 'boarding': return '#4834d4';
    }
  }};
`;

export function FlightManagement() {
  return (
    <Container>
      <Header>
        <Title>
          <Plane size={40} />
          Flight Management System
        </Title>
        <Subtitle>Real-time flight operations and schedule management</Subtitle>
      </Header>

      <Grid>
        <Card>
          <CardTitle>
            <Clock size={24} />
            Flight AA123 Status
          </CardTitle>

          <FlightInfo>
            <TimeBlock>
              <TimeLabel>DEPARTURE</TimeLabel>
              <TimeValue>14:30</TimeValue>
              <div>JFK</div>
            </TimeBlock>
            <div style={{ fontSize: '24px', opacity: 0.6 }}>✈️</div>
            <TimeBlock>
              <TimeLabel>ARRIVAL</TimeLabel>
              <TimeValue>18:45</TimeValue>
              <div>LAX</div>
            </TimeBlock>
          </FlightInfo>

          <div style={{ margin: '16px 0' }}>
            <StatusBadge status="delayed">DELAYED 30 MIN</StatusBadge>
          </div>

          <Button>Update Schedule</Button>
          <Button>Passenger Notifications</Button>
        </Card>

        <Card>
          <CardTitle>
            <MapPin size={24} />
            Gate Information
          </CardTitle>

          <div style={{ fontSize: '16px', lineHeight: '2' }}>
            <div>Current Gate: <strong>B12</strong></div>
            <div>Boarding Status: <StatusBadge status="boarding">BOARDING</StatusBadge></div>
            <div>Boarding Groups: 1-3 Active</div>
            <div>Seat Availability: 89%</div>
          </div>

          <Button>Change Gate</Button>
          <Button>Boarding Control</Button>
          <Button>Seat Management</Button>
        </Card>

        <Card>
          <CardTitle>
            <Navigation size={24} />
            Route & Weather
          </CardTitle>

          <div style={{ margin: '16px 0' }}>
            <div>Current Position: Over Kansas</div>
            <div>Altitude: 35,000 ft</div>
            <div>Ground Speed: 580 mph</div>
            <div>ETA: 18:45 PST</div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <div>Weather Conditions:</div>
            <div>• Destination: Clear, 72°F</div>
            <div>• Route: Light turbulence ahead</div>
          </div>

          <Button>Route Adjustment</Button>
          <Button>Weather Report</Button>
        </Card>

        <Card>
          <CardTitle>
            <BarChart3 size={24} />
            Operations Dashboard
          </CardTitle>

          <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
            <div>✅ Pre-flight checklist completed</div>
            <div>✅ Fuel levels confirmed</div>
            <div>⚠️ Minor ATC delay reported</div>
            <div>✅ Crew briefing completed</div>
            <div>⚠️ Gate change notification sent</div>
          </div>

          <Button>Flight Log</Button>
          <Button>Crew Communication</Button>
          <Button>Maintenance Status</Button>
        </Card>
      </Grid>
    </Container>
  );
}