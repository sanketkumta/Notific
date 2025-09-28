import React from 'react';
import styled from 'styled-components';
import {
  Home,
  Shield,
  Plane,
  Play,
  Wifi,
  ShoppingBag,
  Coffee,
  Settings,
  Users,
  MapPin
} from 'lucide-react';

const NavContainer = styled.nav`
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(15px);
  padding: 16px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  position: relative;
  z-index: 1100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 80px;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const IconWrapper = styled.div`
  margin-bottom: 2px;
`;

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'safety', label: 'Safety', icon: Shield },
  { id: 'flight', label: 'Flight Ops', icon: Plane },
  { id: 'entertainment', label: 'Entertainment', icon: Play },
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'duty-free', label: 'Duty Free', icon: ShoppingBag },
  { id: 'cabin', label: 'Cabin Service', icon: Coffee },
  { id: 'seat', label: 'Seat Mgmt', icon: Settings },
  { id: 'crew', label: 'Crew', icon: Users },
  { id: 'weather', label: 'Weather', icon: MapPin },
];

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <NavContainer>
      {navItems.map(item => {
        const IconComponent = item.icon;
        return (
          <NavButton
            key={item.id}
            active={currentPage === item.id}
            onClick={() => onPageChange(item.id)}
          >
            <IconWrapper>
              <IconComponent size={20} />
            </IconWrapper>
            {item.label}
          </NavButton>
        );
      })}
    </NavContainer>
  );
}