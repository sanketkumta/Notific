import React from 'react';
import styled from 'styled-components';
import { AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
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

const StatusIndicator = styled.div<{ status: 'safe' | 'warning' | 'critical' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 8px 0;
  background: ${props => {
    switch (props.status) {
      case 'safe': return 'rgba(46, 213, 115, 0.2)';
      case 'warning': return 'rgba(255, 165, 2, 0.2)';
      case 'critical': return 'rgba(255, 71, 87, 0.3)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'safe': return 'rgba(46, 213, 115, 0.4)';
      case 'warning': return 'rgba(255, 165, 2, 0.4)';
      case 'critical': return 'rgba(255, 71, 87, 0.4)';
    }
  }};
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

export function FlightSafetySystem() {
  return (
    <Container>
      <Header>
        <Title>
          <Shield size={40} />
          Flight Safety System
        </Title>
        <Subtitle>Real-time safety monitoring and emergency protocols</Subtitle>
      </Header>

      <Grid>
        <Card>
          <CardTitle>
            <AlertTriangle size={24} />
            Current Safety Status
          </CardTitle>

          <StatusIndicator status="safe">
            <CheckCircle size={20} />
            <span>All systems normal</span>
          </StatusIndicator>

          <StatusIndicator status="warning">
            <AlertTriangle size={20} />
            <span>Minor turbulence ahead</span>
          </StatusIndicator>

          <Button>View Safety Checklist</Button>
          <Button>Emergency Procedures</Button>
        </Card>

        <Card>
          <CardTitle>
            <Shield size={24} />
            Emergency Controls
          </CardTitle>

          <Button>Medical Emergency Alert</Button>
          <Button>Security Alert</Button>
          <Button>Weather Emergency</Button>
          <Button>Mechanical Issue Report</Button>

          <StatusIndicator status="critical">
            <XCircle size={20} />
            <span>Emergency protocols ready</span>
          </StatusIndicator>
        </Card>

        <Card>
          <CardTitle>
            <CheckCircle size={24} />
            Safety Compliance
          </CardTitle>

          <div style={{ margin: '16px 0' }}>
            <div>Seatbelt Compliance: 98%</div>
            <div>Safety Demo Viewed: 100%</div>
            <div>Emergency Exits Clear: ✓</div>
            <div>Life Vests Accessible: ✓</div>
          </div>

          <Button>Run Safety Check</Button>
          <Button>View Regulations</Button>
        </Card>

        <Card>
          <CardTitle>
            <AlertTriangle size={24} />
            Recent Alerts
          </CardTitle>

          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <div>• Turbulence warning issued - 2 min ago</div>
            <div>• Seatbelt sign activated - 5 min ago</div>
            <div>• Safety briefing completed - 15 min ago</div>
            <div>• Pre-flight safety check - 45 min ago</div>
          </div>

          <Button>View All Alerts</Button>
        </Card>
      </Grid>
    </Container>
  );
}