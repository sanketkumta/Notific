import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const DemoContainer = styled.div`
  padding: 40px;
  background: #f5f5f5;
  min-height: 100vh;
  font-family: 'Lufthansa Text', sans-serif;
`;

const DemoSection = styled.div`
  margin-bottom: 40px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ButtonLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #666;
  margin-bottom: 8px;
`;

const InteractiveDemo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const ControlLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333;
  min-width: 120px;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  min-width: 150px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

export const ButtonDemo: React.FC = () => {
  const [interactiveType, setInteractiveType] = useState<'primary' | 'secondary' | 'tertiary'>('primary');
  const [interactiveState, setInteractiveState] = useState<'pressed' | 'default' | 'hover' | 'disabled'>('default');
  const [buttonText, setButtonText] = useState('Buy Now');
  const [hasLeftIcon, setHasLeftIcon] = useState(false);
  const [hasRightIcon, setHasRightIcon] = useState(false);
  const [hasFocusRing, setHasFocusRing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1);
  };

  return (
    <DemoContainer>
      <DemoSection>
        <SectionTitle>Button Variants</SectionTitle>
        <ButtonGrid>
          <ButtonGroup>
            <ButtonLabel>Primary Buttons</ButtonLabel>
            <Button type="primary" state="default" buttonText="Default" />
            <Button type="primary" state="hover" buttonText="Hover" />
            <Button type="primary" state="pressed" buttonText="Pressed" />
            <Button type="primary" state="disabled" buttonText="Disabled" />
          </ButtonGroup>

          <ButtonGroup>
            <ButtonLabel>Secondary Buttons</ButtonLabel>
            <Button type="secondary" state="default" buttonText="Default" />
            <Button type="secondary" state="hover" buttonText="Hover" />
            <Button type="secondary" state="pressed" buttonText="Pressed" />
            <Button type="secondary" state="disabled" buttonText="Disabled" />
          </ButtonGroup>

          <ButtonGroup>
            <ButtonLabel>Tertiary Buttons</ButtonLabel>
            <Button type="tertiary" state="default" buttonText="Default" />
            <Button type="tertiary" state="hover" buttonText="Hover" />
            <Button type="tertiary" state="pressed" buttonText="Pressed" />
            <Button type="tertiary" state="disabled" buttonText="Disabled" />
          </ButtonGroup>
        </ButtonGrid>
      </DemoSection>

      <DemoSection>
        <SectionTitle>Interactive Demo</SectionTitle>
        <InteractiveDemo>
          <ControlRow>
            <ControlLabel>Button Type:</ControlLabel>
            <Select 
              value={interactiveType} 
              onChange={(e) => setInteractiveType(e.target.value as 'primary' | 'secondary' | 'tertiary')}
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="tertiary">Tertiary</option>
            </Select>
          </ControlRow>

          <ControlRow>
            <ControlLabel>Button State:</ControlLabel>
            <Select 
              value={interactiveState} 
              onChange={(e) => setInteractiveState(e.target.value as 'pressed' | 'default' | 'hover' | 'disabled')}
            >
              <option value="default">Default</option>
              <option value="hover">Hover</option>
              <option value="pressed">Pressed</option>
              <option value="disabled">Disabled</option>
            </Select>
          </ControlRow>

          <ControlRow>
            <ControlLabel>Button Text:</ControlLabel>
            <Input 
              value={buttonText} 
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="Enter button text"
            />
          </ControlRow>

          <ControlRow>
            <ControlLabel>Options:</ControlLabel>
            <label>
              <Checkbox 
                type="checkbox" 
                checked={hasLeftIcon} 
                onChange={(e) => setHasLeftIcon(e.target.checked)}
              />
              Left Icon
            </label>
            <label>
              <Checkbox 
                type="checkbox" 
                checked={hasRightIcon} 
                onChange={(e) => setHasRightIcon(e.target.checked)}
              />
              Right Icon
            </label>
            <label>
              <Checkbox 
                type="checkbox" 
                checked={hasFocusRing} 
                onChange={(e) => setHasFocusRing(e.target.checked)}
              />
              Focus Ring
            </label>
            <label>
              <Checkbox 
                type="checkbox" 
                checked={isLoading} 
                onChange={(e) => setIsLoading(e.target.checked)}
              />
              Loading
            </label>
          </ControlRow>

          <div style={{ marginTop: '20px' }}>
            <Button
              type={interactiveType}
              state={interactiveState}
              buttonText={buttonText}
              hasLeftIcon={hasLeftIcon}
              hasRightIcon={hasRightIcon}
              hasFocusRing={hasFocusRing}
              isLoading={isLoading}
              onClick={handleButtonClick}
            />
            <div style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
              Click count: {clickCount}
            </div>
          </div>
        </InteractiveDemo>
      </DemoSection>

      <DemoSection>
        <SectionTitle>Usage Examples</SectionTitle>
        <ButtonGroup>
          <ButtonLabel>Common Use Cases</ButtonLabel>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Button type="primary" buttonText="Save Changes" onClick={() => alert('Saved!')} />
            <Button type="secondary" buttonText="Cancel" onClick={() => alert('Cancelled!')} />
            <Button type="tertiary" buttonText="Learn More" onClick={() => alert('Learn more clicked!')} />
            <Button type="primary" buttonText="Processing..." isLoading={true} />
            <Button type="primary" buttonText="Disabled" state="disabled" />
          </div>
        </ButtonGroup>
      </DemoSection>
    </DemoContainer>
  );
};

export default ButtonDemo;
