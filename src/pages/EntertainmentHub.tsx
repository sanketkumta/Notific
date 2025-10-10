import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  padding: 20px;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyMessage = styled.div`
  text-align: center;
  font-size: 24px;
  color: #666666;
`;

export function EntertainmentHub() {
  return (
    <Container>
      <EmptyMessage>Movies & TV</EmptyMessage>
    </Container>
  );
}
