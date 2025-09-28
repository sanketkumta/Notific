import React from 'react';
import styled from 'styled-components';
import { Wifi, Signal, Globe, Settings, CreditCard, Users } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #2ed573 0%, #1dd1a1 100%);
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

const StatusIndicator = styled.div<{ status: 'connected' | 'disconnected' | 'weak' }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  margin: 12px 0;
  background: ${props => {
    switch (props.status) {
      case 'connected': return 'rgba(46, 213, 115, 0.2)';
      case 'weak': return 'rgba(255, 165, 2, 0.2)';
      case 'disconnected': return 'rgba(255, 71, 87, 0.2)';
    }
  }};
  border: 1px solid ${props => {
    switch (props.status) {
      case 'connected': return 'rgba(46, 213, 115, 0.4)';
      case 'weak': return 'rgba(255, 165, 2, 0.4)';
      case 'disconnected': return 'rgba(255, 71, 87, 0.4)';
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

const PrimaryButton = styled(Button)`
  background: linear-gradient(135deg, #4834d4 0%, #686de0 100%);
  border: none;
  font-weight: 600;

  &:hover {
    background: linear-gradient(135deg, #5a4fcf 0%, #7b6feb 100%);
  }
`;

const PlanCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const PlanPrice = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffa502;
`;

const PlanFeatures = styled.div`
  font-size: 14px;
  margin-top: 8px;
  line-height: 1.6;
`;

export function WiFiManagement() {
  return (
    <Container>
      <Header>
        <Title>
          <Wifi size={40} />
          WiFi Management
        </Title>
        <Subtitle>High-speed internet at 35,000 feet</Subtitle>
      </Header>

      <Grid>
        <Card>
          <CardTitle>
            <Signal size={24} />
            Connection Status
          </CardTitle>

          <StatusIndicator status="connected">
            <Wifi size={20} />
            <span>Connected to SkyConnect WiFi</span>
          </StatusIndicator>

          <div style={{ margin: '16px 0', fontSize: '14px' }}>
            <div>Signal Strength: Strong (4/4 bars)</div>
            <div>Download Speed: 25 Mbps</div>
            <div>Upload Speed: 5 Mbps</div>
            <div>Data Used: 45 MB / 500 MB</div>
          </div>

          <Button>Run Speed Test</Button>
          <Button>Connection History</Button>
        </Card>

        <Card>
          <CardTitle>
            <CreditCard size={24} />
            WiFi Plans
          </CardTitle>

          <PlanCard>
            <div style={{ fontWeight: 'bold' }}>Basic Plan</div>
            <PlanPrice>$8.99</PlanPrice>
            <PlanFeatures>
              • 1 hour access<br/>
              • Basic browsing & email<br/>
              • 1 device
            </PlanFeatures>
          </PlanCard>

          <PlanCard>
            <div style={{ fontWeight: 'bold' }}>Premium Plan</div>
            <PlanPrice>$19.99</PlanPrice>
            <PlanFeatures>
              • Full flight access<br/>
              • Streaming & video calls<br/>
              • 3 devices
            </PlanFeatures>
          </PlanCard>

          <PrimaryButton>Purchase Plan</PrimaryButton>
          <Button>Compare Plans</Button>
        </Card>

        <Card>
          <CardTitle>
            <Users size={24} />
            Device Management
          </CardTitle>

          <div style={{ margin: '16px 0', fontSize: '14px', lineHeight: '2' }}>
            <div>📱 iPhone 13 Pro - Connected</div>
            <div>💻 MacBook Air - Connected</div>
            <div>🎧 iPad - Available slot</div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <div>Available Connections: 1/3</div>
            <div>Data Sharing: Enabled</div>
          </div>

          <Button>Add Device</Button>
          <Button>Manage Connections</Button>
          <Button>Data Usage Settings</Button>
        </Card>

        <Card>
          <CardTitle>
            <Settings size={24} />
            Network Settings
          </CardTitle>

          <div style={{ fontSize: '14px', lineHeight: '2', margin: '16px 0' }}>
            <div>Network: SkyConnect_5G</div>
            <div>Security: WPA3 Enterprise</div>
            <div>Bandwidth: Unlimited*</div>
            <div>Latency: ~600ms (Satellite)</div>
          </div>

          <StatusIndicator status="weak">
            <Globe size={20} />
            <span>Satellite connection active</span>
          </StatusIndicator>

          <Button>Network Diagnostics</Button>
          <Button>Advanced Settings</Button>
          <Button>VPN Configuration</Button>
        </Card>

        <Card>
          <CardTitle>
            <Globe size={24} />
            Support & Help
          </CardTitle>

          <div style={{ fontSize: '14px', lineHeight: '2', margin: '16px 0' }}>
            <div>📞 Technical Support</div>
            <div>💬 Live Chat Available</div>
            <div>❓ FAQ & Troubleshooting</div>
            <div>📧 Contact Form</div>
          </div>

          <div style={{ marginTop: '16px', fontSize: '13px', opacity: 0.8 }}>
            *Fair usage policy applies. Streaming may be limited during peak hours.
          </div>

          <Button>Get Help</Button>
          <Button>Report Issue</Button>
          <Button>Service Status</Button>
        </Card>
      </Grid>
    </Container>
  );
}