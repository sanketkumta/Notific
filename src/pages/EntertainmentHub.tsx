import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #4834d4 0%, #686de0 100%);
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

export function EntertainmentHub() {
  return (
    <Container>
      <EmptyMessage>Movies & TV</EmptyMessage>
    </Container>
  );
}
