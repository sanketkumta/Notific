import React from 'react';
import styled from 'styled-components';
import { Coffee, UtensilsCrossed, Bell, Star } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #a55eea 0%, #8854d0 100%);
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

const ServiceItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export function CabinService() {
  return (
    <Container>
      <Header>
        <Title>
          <Coffee size={40} />
          Cabin Service
        </Title>
        <Subtitle>Premium dining and service management</Subtitle>
      </Header>

      <Grid>
        <Card>
          <CardTitle>
            <UtensilsCrossed size={24} />
            Meal Service Schedule
          </CardTitle>

          <ServiceItem>
            <div>
              <div style={{ fontWeight: 'bold' }}>Breakfast Service</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>7:30 AM - 9:00 AM</div>
            </div>
            <Button>Start Service</Button>
          </ServiceItem>

          <ServiceItem>
            <div>
              <div style={{ fontWeight: 'bold' }}>Beverage Service</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>10:00 AM - 11:30 AM</div>
            </div>
            <Button>In Progress</Button>
          </ServiceItem>

          <ServiceItem>
            <div>
              <div style={{ fontWeight: 'bold' }}>Lunch Service</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>12:30 PM - 2:00 PM</div>
            </div>
            <Button>Schedule</Button>
          </ServiceItem>

          <Button>View Full Schedule</Button>
        </Card>

        <Card>
          <CardTitle>
            <Bell size={24} />
            Service Requests
          </CardTitle>

          <div style={{ fontSize: '14px', lineHeight: '2' }}>
            <div>🔔 Seat 12A - Extra blanket</div>
            <div>🔔 Seat 8C - Vegetarian meal</div>
            <div>🔔 Seat 15F - Coffee refill</div>
            <div>🔔 Seat 3B - Medical assistance</div>
          </div>

          <Button>Respond to Requests</Button>
          <Button>Call Flight Attendant</Button>
        </Card>

        <Card>
          <CardTitle>
            <Star size={24} />
            Menu & Options
          </CardTitle>

          <div style={{ margin: '16px 0' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Today's Menu:</div>
            <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
              🍽️ Grilled Chicken with Rice<br/>
              🥗 Mediterranean Salad<br/>
              🍝 Pasta Marinara (Vegetarian)<br/>
              🥤 Beverages: Coffee, Tea, Soft Drinks<br/>
              🍷 Premium Wine Selection
            </div>
          </div>

          <Button>View Full Menu</Button>
          <Button>Special Dietary Options</Button>
        </Card>
      </Grid>
    </Container>
  );
}