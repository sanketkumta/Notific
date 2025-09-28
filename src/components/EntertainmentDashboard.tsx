import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Play,
  Music,
  Gamepad2,
  ShoppingBag,
  Utensils,
  Wifi,
  Map,
  Camera,
  Headphones,
  Coffee,
  X
} from 'lucide-react';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  padding: 20px;
`;

const AppTile = styled.div`
  background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
  border-radius: 16px;
  padding: 20px;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  &:nth-child(odd) {
    background: linear-gradient(135deg, #fd79a8 0%, #e84393 100%);
  }

  &:nth-child(3n) {
    background: linear-gradient(135deg, #fdcb6e 0%, #e17055 100%);
  }

  &:nth-child(4n) {
    background: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%);
  }

  &:nth-child(5n) {
    background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
  }
`;

const AppIcon = styled.div`
  margin-bottom: 12px;
`;

const AppName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const AppDescription = styled.div`
  font-size: 11px;
  opacity: 0.8;
  margin-top: 4px;
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 40px;
  color: white;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  width: 800px;
  min-height: 400px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const AppTitle = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AppContent = styled.div`
  line-height: 1.6;
  font-size: 16px;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`;

const DemoButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const apps = [
  {
    icon: <Play size={32} />,
    name: 'Movies & TV',
    description: '500+ titles',
    id: 'movies'
  },
  {
    icon: <Music size={32} />,
    name: 'Music',
    description: 'Unlimited streaming',
    id: 'music'
  },
  {
    icon: <Gamepad2 size={32} />,
    name: 'Games',
    description: 'Arcade & puzzles',
    id: 'games'
  },
  {
    icon: <ShoppingBag size={32} />,
    name: 'Duty Free',
    description: 'Shop & save',
    id: 'duty-free'
  },
  {
    icon: <Utensils size={32} />,
    name: 'Food & Drinks',
    description: 'Order to seat',
    id: 'food'
  },
  {
    icon: <Wifi size={32} />,
    name: 'Internet',
    description: 'High-speed WiFi',
    id: 'internet'
  },
  {
    icon: <Map size={32} />,
    name: 'Flight Map',
    description: 'Live tracking',
    id: 'map'
  },
  {
    icon: <Camera size={32} />,
    name: 'Photo Gallery',
    description: 'Destination pics',
    id: 'photos'
  },
  {
    icon: <Headphones size={32} />,
    name: 'Audio Books',
    description: 'Best sellers',
    id: 'audiobooks'
  },
  {
    icon: <Coffee size={32} />,
    name: 'Lounge Services',
    description: 'VIP experience',
    id: 'lounge'
  }
];

const getAppContent = (appId: string) => {
  switch (appId) {
    case 'movies':
      return (
        <AppContent>
          <p>Enjoy our extensive collection of movies and TV shows during your flight.</p>
          <FeatureGrid>
            <FeatureCard>
              <h3>Latest Movies</h3>
              <p>New releases and blockbusters</p>
              <DemoButton>Browse Movies</DemoButton>
            </FeatureCard>
            <FeatureCard>
              <h3>TV Series</h3>
              <p>Binge-watch your favorites</p>
              <DemoButton>Browse Shows</DemoButton>
            </FeatureCard>
            <FeatureCard>
              <h3>Documentaries</h3>
              <p>Educational and inspiring content</p>
              <DemoButton>Explore Docs</DemoButton>
            </FeatureCard>
          </FeatureGrid>
        </AppContent>
      );
    case 'music':
      return (
        <AppContent>
          <p>Stream millions of songs and podcasts at 35,000 feet.</p>
          <FeatureGrid>
            <FeatureCard>
              <h3>Top Charts</h3>
              <p>Latest hits and trending music</p>
              <DemoButton>Play Now</DemoButton>
            </FeatureCard>
            <FeatureCard>
              <h3>Playlists</h3>
              <p>Curated playlists for every mood</p>
              <DemoButton>Browse Playlists</DemoButton>
            </FeatureCard>
            <FeatureCard>
              <h3>Podcasts</h3>
              <p>Educational and entertainment podcasts</p>
              <DemoButton>Listen</DemoButton>
            </FeatureCard>
          </FeatureGrid>
        </AppContent>
      );
    case 'games':
      return (
        <AppContent>
          <p>Play entertaining games to pass the time during your journey.</p>
          <FeatureGrid>
            <FeatureCard>
              <h3>Puzzle Games</h3>
              <p>Sudoku, crosswords, and more</p>
              <DemoButton>Start Playing</DemoButton>
            </FeatureCard>
            <FeatureCard>
              <h3>Arcade Games</h3>
              <p>Classic arcade-style games</p>
              <DemoButton>Play Now</DemoButton>
            </FeatureCard>
            <FeatureCard>
              <h3>Trivia</h3>
              <p>Test your knowledge</p>
              <DemoButton>Start Quiz</DemoButton>
            </FeatureCard>
          </FeatureGrid>
        </AppContent>
      );
    case 'duty-free':
      return (
        <AppContent>
          <p>Shop exclusive duty-free products with special inflight pricing.</p>
          <FeatureGrid>
            <FeatureCard>
              <h3>Perfumes</h3>
              <p>Luxury fragrances at great prices</p>
              <DemoButton>Shop Now</DemoButton>
            </FeatureCard>
            <FeatureCard>
              <h3>Electronics</h3>
              <p>Latest gadgets and accessories</p>
              <DemoButton>Browse</DemoButton>
            </FeatureCard>
            <FeatureCard>
              <h3>Souvenirs</h3>
              <p>Remember your journey</p>
              <DemoButton>View Items</DemoButton>
            </FeatureCard>
          </FeatureGrid>
        </AppContent>
      );
    case 'food':
      return (
        <AppContent>
          <p>Order delicious meals and beverages directly to your seat.</p>
          <FeatureGrid>
            <FeatureCard>
              <h3>Meals</h3>
              <p>Fresh, quality dining options</p>
              <DemoButton>View Menu</DemoButton>
            </FeatureCard>
            <FeatureCard>
              <h3>Snacks</h3>
              <p>Light bites and healthy options</p>
              <DemoButton>Order Snacks</DemoButton>
            </FeatureCard>
            <FeatureCard>
              <h3>Beverages</h3>
              <p>Hot and cold drinks</p>
              <DemoButton>Order Drinks</DemoButton>
            </FeatureCard>
          </FeatureGrid>
        </AppContent>
      );
    default:
      return (
        <AppContent>
          <p>Welcome to {apps.find(app => app.id === appId)?.name}!</p>
          <p>This feature is coming soon. Stay tuned for updates!</p>
          <DemoButton>Learn More</DemoButton>
        </AppContent>
      );
  }
};

interface EntertainmentDashboardProps {
  onAppOpen: (appId: string) => void;
}

export function EntertainmentDashboard({ onAppOpen }: EntertainmentDashboardProps) {
  return (
    <Container>
      {apps.map((app, index) => (
        <AppTile key={index} onClick={() => onAppOpen(app.id)}>
          <AppIcon>{app.icon}</AppIcon>
          <AppName>{app.name}</AppName>
          <AppDescription>{app.description}</AppDescription>
        </AppTile>
      ))}
    </Container>
  );
}