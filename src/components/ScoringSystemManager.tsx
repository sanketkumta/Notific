import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Settings,
  ChevronDown,
  ChevronUp,
  Edit3,
  Save,
  RotateCcw,
  Calculator,
  Info,
  AlertTriangle,
  Eye,
  EyeOff
} from 'lucide-react';

const Container = styled.div<{ isExpanded: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 20px;
  color: white;
  width: ${props => props.isExpanded ? '600px' : '280px'};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  max-height: ${props => props.isExpanded ? '90vh' : '70px'};
  overflow: hidden;
  z-index: 1000;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Content = styled.div`
  max-height: calc(90vh - 100px);
  overflow-y: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const FormulaSection = styled.div`
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const FormulaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const FormulaTitle = styled.h4`
  margin: 0;
  font-size: 14px;
  color: #64B5F6;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FormulaActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  background: ${props => {
    switch (props.variant) {
      case 'primary': return 'linear-gradient(135deg, #2ed573 0%, #1dd1a1 100%)';
      case 'danger': return 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const FormulaDisplay = styled.div<{ isEditing: boolean }>`
  background: ${props => props.isEditing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.3)'};
  border: 1px solid ${props => props.isEditing ? '#64B5F6' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 8px;
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  margin-bottom: 12px;
  position: relative;
`;

const FormulaText = styled.div`
  color: #E8F5E8;
`;

const FormulaInput = styled.textarea`
  background: transparent;
  border: none;
  color: #E8F5E8;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  width: 100%;
  min-height: 80px;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const ParameterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
`;

const ParameterItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  padding: 8px;
`;

const ParameterLabel = styled.div`
  font-size: 10px;
  color: #FFC107;
  margin-bottom: 4px;
  font-weight: 600;
`;

const ParameterValue = styled.div`
  font-size: 11px;
  color: white;
`;

const WeightInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 4px 8px;
  color: white;
  font-size: 11px;
  width: 60px;

  &:focus {
    outline: none;
    border-color: #64B5F6;
  }
`;

const ScoreRange = styled.div`
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.5);
  border-radius: 6px;
  padding: 8px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FormulaDescription = styled.div`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.3;
  margin-bottom: 8px;
`;

const TestSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
`;

const TestTitle = styled.div`
  font-size: 12px;
  color: #FFC107;
  margin-bottom: 8px;
  font-weight: 600;
`;

const TestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
`;

const TestInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 6px 8px;
  color: white;
  font-size: 11px;

  &:focus {
    outline: none;
    border-color: #64B5F6;
  }
`;

const TestResult = styled.div`
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.5);
  border-radius: 4px;
  padding: 8px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
`;

const GlobalControls = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ControlRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ControlLabel = styled.label`
  font-size: 12px;
  color: #64B5F6;
  font-weight: 600;
`;

// Default formula configurations
const defaultFormulas = {
  crossApp: {
    name: 'Cross App Notifications',
    description: 'For notifications from different apps than currently active',
    formula: '(0.40 × CategoryImportance) + (0.25 × CashValue) + (0.20 × Relevance) + (0.15 × Recency)',
    weights: { categoryImportance: 0.40, cashValue: 0.25, relevance: 0.20, recency: 0.15 },
    maxScore: 7.2,
    normalizedMax: 10,
    parameters: ['Category Importance (1-3)', 'Cash Value (priorityScore/10)', 'Relevance (1-10)', 'Recency (1-10)']
  },
  userSystem: {
    name: 'User System Notifications',
    description: 'System notifications with app context awareness',
    formula: '(0.33 × InvertedPriority) + (0.33 × AppRelevance) + (0.33 × Consequence)',
    weights: { priority: 0.33, appRelevance: 0.33, consequence: 0.33 },
    maxScore: 30,
    normalizedMax: 10,
    parameters: ['Priority (1-10, inverted)', 'App Relevance (boosted if same app)', 'Consequence (1-10)']
  },
  safetyOperational: {
    name: 'Safety & Operational',
    description: 'Critical safety and operational notifications',
    formula: '(0.33 × InvertedPriority) + (0.33 × Impact) + (0.33 × Consequence)',
    weights: { priority: 0.33, impact: 0.33, consequence: 0.33 },
    maxScore: 30,
    normalizedMax: 10,
    parameters: ['Priority (1-10, inverted)', 'Impact on Passengers (1-10)', 'Consequence (1-10)']
  },
  withinApp: {
    name: 'Within App Notifications',
    description: 'Notifications from the currently active app',
    formula: '(0.25 × TimePhaseBound) + (0.25 × Relevance) + (0.25 × Consequence) + (0.25 × Recency)',
    weights: { timePhaseBound: 0.25, relevance: 0.25, consequence: 0.25, recency: 0.25 },
    maxScore: 10,
    normalizedMax: 10,
    parameters: ['Time/Phase-bound (1-10)', 'Relevance to app activity (1-10)', 'Consequence (1-10)', 'Recency (1-10)']
  }
};

interface ScoringSystemManagerProps {
  onFormulaUpdate?: (formulaType: string, newFormula: any) => void;
}

export function ScoringSystemManager({ onFormulaUpdate }: ScoringSystemManagerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingFormula, setEditingFormula] = useState<string | null>(null);
  const [formulas, setFormulas] = useState(defaultFormulas);
  const [globalSettings, setGlobalSettings] = useState({
    enabled: true,
    debugMode: false,
    showCalculations: false
  });

  // Test values for formula calculation
  const [testValues, setTestValues] = useState({
    priority: 1,
    relevance: 8,
    consequence: 7,
    recency: 9,
    timePhaseBound: 6,
    categoryImportance: 2,
    cashValue: 3,
    impact: 8
  });

  // Calculate test score for a given formula
  const calculateTestScore = (formulaKey: string) => {
    const formula = formulas[formulaKey as keyof typeof formulas];
    const weights = formula.weights as any;

    switch (formulaKey) {
      case 'crossApp':
        // (0.40 × CategoryImportance) + (0.25 × CashValue) + (0.20 × Relevance) + (0.15 × Recency)
        return (weights.categoryImportance * testValues.categoryImportance) +
               (weights.cashValue * testValues.cashValue) +
               (weights.relevance * testValues.relevance) +
               (weights.recency * testValues.recency);
      case 'userSystem':
        // (0.33 × InvertedPriority) + (0.33 × AppRelevance) + (0.33 × Consequence)
        const invertedPriority = 11 - testValues.priority;
        return (weights.priority * invertedPriority) +
               (weights.appRelevance * testValues.relevance) +
               (weights.consequence * testValues.consequence);
      case 'safetyOperational':
        // (0.33 × InvertedPriority) + (0.33 × Impact) + (0.33 × Consequence)
        const invertedPrioritySafety = 11 - testValues.priority;
        return (weights.priority * invertedPrioritySafety) +
               (weights.impact * testValues.impact) +
               (weights.consequence * testValues.consequence);
      case 'withinApp':
        // (0.25 × TimePhaseBound) + (0.25 × Relevance) + (0.25 × Consequence) + (0.25 × Recency)
        return (weights.timePhaseBound * testValues.timePhaseBound) +
               (weights.relevance * testValues.relevance) +
               (weights.consequence * testValues.consequence) +
               (weights.recency * testValues.recency);
      default:
        return 0;
    }
  };

  const handleWeightChange = (formulaKey: string, weightKey: string, value: number) => {
    setFormulas(prev => ({
      ...prev,
      [formulaKey]: {
        ...prev[formulaKey as keyof typeof prev],
        weights: {
          ...prev[formulaKey as keyof typeof prev].weights,
          [weightKey]: value
        } as any
      }
    }));
  };

  const resetFormula = (formulaKey: string) => {
    setFormulas(prev => ({
      ...prev,
      [formulaKey]: defaultFormulas[formulaKey as keyof typeof defaultFormulas]
    }));
    setEditingFormula(null);
  };

  const saveFormula = (formulaKey: string) => {
    setEditingFormula(null);
    if (onFormulaUpdate) {
      onFormulaUpdate(formulaKey, formulas[formulaKey as keyof typeof formulas]);
    }
  };

  return (
    <Container isExpanded={isExpanded}>
      <Header onClick={() => setIsExpanded(!isExpanded)}>
        <Title>
          <Calculator size={16} />
          Scoring System Manager
        </Title>
        <ExpandButton>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </ExpandButton>
      </Header>

      <Content>
        {/* Global Controls */}
        <GlobalControls>
          <FormulaTitle>
            <Settings size={14} />
            Global Settings
          </FormulaTitle>
          <ControlRow>
            <ControlLabel>System Enabled</ControlLabel>
            <ActionButton
              variant={globalSettings.enabled ? 'primary' : 'secondary'}
              onClick={() => setGlobalSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
            >
              {globalSettings.enabled ? <Eye size={12} /> : <EyeOff size={12} />}
              {globalSettings.enabled ? 'ON' : 'OFF'}
            </ActionButton>
          </ControlRow>
          <ControlRow>
            <ControlLabel>Debug Mode</ControlLabel>
            <ActionButton
              variant={globalSettings.debugMode ? 'primary' : 'secondary'}
              onClick={() => setGlobalSettings(prev => ({ ...prev, debugMode: !prev.debugMode }))}
            >
              {globalSettings.debugMode ? 'ON' : 'OFF'}
            </ActionButton>
          </ControlRow>
          <ControlRow>
            <ControlLabel>Show Calculations</ControlLabel>
            <ActionButton
              variant={globalSettings.showCalculations ? 'primary' : 'secondary'}
              onClick={() => setGlobalSettings(prev => ({ ...prev, showCalculations: !prev.showCalculations }))}
            >
              {globalSettings.showCalculations ? 'ON' : 'OFF'}
            </ActionButton>
          </ControlRow>
        </GlobalControls>

        {/* Formula Sections */}
        {Object.entries(formulas).map(([key, formula]) => (
          <FormulaSection key={key}>
            <FormulaHeader>
              <FormulaTitle>
                <Info size={12} />
                {formula.name}
              </FormulaTitle>
              <FormulaActions>
                <ActionButton
                  onClick={() => setEditingFormula(editingFormula === key ? null : key)}
                >
                  <Edit3 size={12} />
                  {editingFormula === key ? 'Cancel' : 'Edit'}
                </ActionButton>
                {editingFormula === key && (
                  <>
                    <ActionButton variant="primary" onClick={() => saveFormula(key)}>
                      <Save size={12} />
                      Save
                    </ActionButton>
                    <ActionButton variant="danger" onClick={() => resetFormula(key)}>
                      <RotateCcw size={12} />
                      Reset
                    </ActionButton>
                  </>
                )}
              </FormulaActions>
            </FormulaHeader>

            <FormulaDescription>{formula.description}</FormulaDescription>

            <FormulaDisplay isEditing={editingFormula === key}>
              {editingFormula === key ? (
                <FormulaInput
                  value={formula.formula}
                  onChange={(e) => setFormulas(prev => ({
                    ...prev,
                    [key]: { ...prev[key as keyof typeof prev], formula: e.target.value }
                  }))}
                  placeholder="Enter formula..."
                />
              ) : (
                <FormulaText>{formula.formula}</FormulaText>
              )}
            </FormulaDisplay>

            <ParameterGrid>
              {formula.parameters.map((param, index) => (
                <ParameterItem key={index}>
                  <ParameterLabel>{param}</ParameterLabel>
                  <ParameterValue>Range specified in description</ParameterValue>
                </ParameterItem>
              ))}
            </ParameterGrid>

            {editingFormula === key && (
              <ParameterGrid>
                {Object.entries(formula.weights).map(([weightKey, weightValue]) => (
                  <ParameterItem key={weightKey}>
                    <ParameterLabel>{weightKey} Weight</ParameterLabel>
                    <WeightInput
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={weightValue}
                      onChange={(e) => handleWeightChange(key, weightKey, parseFloat(e.target.value))}
                    />
                  </ParameterItem>
                ))}
              </ParameterGrid>
            )}

            <ScoreRange>
              <AlertTriangle size={12} />
              Score Range: 0-{formula.normalizedMax} | Max Raw: {formula.maxScore}
            </ScoreRange>

            {/* Test Section */}
            <TestSection>
              <TestTitle>Test Calculator</TestTitle>
              <TestGrid>
                {key === 'crossApp' && (
                  <>
                    <div>
                      <ParameterLabel>Category Importance (1-3)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="3"
                        value={testValues.categoryImportance}
                        onChange={(e) => setTestValues(prev => ({ ...prev, categoryImportance: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <ParameterLabel>Cash Value (0-10)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="0"
                        max="10"
                        value={testValues.cashValue}
                        onChange={(e) => setTestValues(prev => ({ ...prev, cashValue: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <ParameterLabel>Relevance (1-10)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.relevance}
                        onChange={(e) => setTestValues(prev => ({ ...prev, relevance: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <ParameterLabel>Recency (1-10)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.recency}
                        onChange={(e) => setTestValues(prev => ({ ...prev, recency: parseInt(e.target.value) }))}
                      />
                    </div>
                  </>
                )}
                {key === 'userSystem' && (
                  <>
                    <div>
                      <ParameterLabel>Priority (1-10, inverted)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.priority}
                        onChange={(e) => setTestValues(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <ParameterLabel>App Relevance (1-10)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.relevance}
                        onChange={(e) => setTestValues(prev => ({ ...prev, relevance: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <ParameterLabel>Consequence (1-10)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.consequence}
                        onChange={(e) => setTestValues(prev => ({ ...prev, consequence: parseInt(e.target.value) }))}
                      />
                    </div>
                  </>
                )}
                {key === 'safetyOperational' && (
                  <>
                    <div>
                      <ParameterLabel>Priority (1-10, inverted)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.priority}
                        onChange={(e) => setTestValues(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <ParameterLabel>Impact (1-10)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.impact}
                        onChange={(e) => setTestValues(prev => ({ ...prev, impact: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <ParameterLabel>Consequence (1-10)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.consequence}
                        onChange={(e) => setTestValues(prev => ({ ...prev, consequence: parseInt(e.target.value) }))}
                      />
                    </div>
                  </>
                )}
                {key === 'withinApp' && (
                  <>
                    <div>
                      <ParameterLabel>Time/Phase-bound (1-10)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.timePhaseBound}
                        onChange={(e) => setTestValues(prev => ({ ...prev, timePhaseBound: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <ParameterLabel>Relevance (1-10)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.relevance}
                        onChange={(e) => setTestValues(prev => ({ ...prev, relevance: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <ParameterLabel>Consequence (1-10)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.consequence}
                        onChange={(e) => setTestValues(prev => ({ ...prev, consequence: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <ParameterLabel>Recency (1-10)</ParameterLabel>
                      <TestInput
                        type="number"
                        min="1"
                        max="10"
                        value={testValues.recency}
                        onChange={(e) => setTestValues(prev => ({ ...prev, recency: parseInt(e.target.value) }))}
                      />
                    </div>
                  </>
                )}
                <div>
                  <ParameterLabel>Score Result</ParameterLabel>
                  <TestResult>{calculateTestScore(key).toFixed(2)}</TestResult>
                </div>
              </TestGrid>
            </TestSection>
          </FormulaSection>
        ))}
      </Content>
    </Container>
  );
}