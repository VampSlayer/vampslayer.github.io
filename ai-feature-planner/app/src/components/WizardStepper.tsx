import React from 'react';
import { Check } from 'lucide-react';

export type WizardStep = 'INPUT' | 'STORIES' | 'TASKS' | 'AC' | 'TESTS' | 'EXPORT';

interface WizardStepperProps {
  currentStep: WizardStep;
}

const STEPS = [
  { id: 'INPUT', label: 'Idea' },
  { id: 'STORIES', label: 'Stories' },
  { id: 'TASKS', label: 'Tasks' },
  { id: 'AC', label: 'Acceptance' },
  { id: 'TESTS', label: 'Tests' },
  { id: 'EXPORT', label: 'Export' }
];

export const WizardStepper: React.FC<WizardStepperProps> = ({ currentStep }) => {
  const currentIndex = STEPS.findIndex(s => s.id === currentStep);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', width: '100%' }}>
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isLast = index === STEPS.length - 1;
          
          return (
            <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: 1, position: 'relative' }}>
              
              {!isLast && (
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '50%',
                  width: '100%',
                  height: '2px',
                  background: isCompleted ? 'var(--color-primary)' : 'var(--color-border)',
                  zIndex: 0,
                  transition: 'background-color 0.3s ease'
                }} />
              )}

              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: isCompleted ? 'var(--color-primary)' : 'var(--color-bg-base)',
                border: `2px solid ${isCompleted || isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                color: isCompleted ? 'white' : isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                zIndex: 1
              }}>
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: isActive ? 600 : 400,
                color: isActive || isCompleted ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                zIndex: 1
              }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
