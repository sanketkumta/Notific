import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffa502 0%, #ff6348 100%);
  padding: 20px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 24px;
  opacity: 0.7;
`;

export function DutyFreeShop() {
  return (
    <Container>
      <EmptyMessage>Duty Free</EmptyMessage>
    </Container>
  );
}
