import React from 'react';
import { Loader2, RefreshCw, CheckCircle } from 'lucide-react';

interface ReviewStepProps {
  title: string;
  description: string;
  isGenerating: boolean;
  onApprove: () => void;
  onRegenerate: (refinement?: string) => void;
  children: React.ReactNode;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({ title, description, isGenerating, onApprove, onRegenerate, children }) => {
  const [showRefinement, setShowRefinement] = React.useState(false);
  const [refinementText, setRefinementText] = React.useState('');

  const handleRegenerate = () => {
    onRegenerate(refinementText.trim() || undefined);
    setShowRefinement(false);
    setRefinementText('');
  };

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{title}</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>{description}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowRefinement(!showRefinement)}
              disabled={isGenerating}
            >
              {isGenerating ? <Loader2 className="loader" size={18} /> : <RefreshCw size={18} />}
              Regenerate
            </button>
            <button 
              className="btn btn-primary" 
              onClick={onApprove}
              disabled={isGenerating || showRefinement}
            >
              <CheckCircle size={18} />
              Approve & Continue
            </button>
          </div>
        </div>

        {showRefinement && (
          <div className="animate-fade-in" style={{ padding: '1rem', background: 'var(--color-bg-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginTop: '0.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Optional: What should the AI do differently?
            </label>
            <textarea 
              rows={3}
              value={refinementText}
              onChange={(e) => setRefinementText(e.target.value)}
              placeholder="E.g., Make the stories more detailed, focus on backend architecture, etc."
              disabled={isGenerating}
              style={{ width: '100%', marginBottom: '1rem' }}
            />
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button className="btn btn-ghost" onClick={() => setShowRefinement(false)} disabled={isGenerating}>Cancel</button>
              <button className="btn btn-secondary" onClick={handleRegenerate} disabled={isGenerating}>
                Generate Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div style={{ opacity: isGenerating ? 0.5 : 1, transition: 'opacity 0.2s', pointerEvents: isGenerating ? 'none' : 'auto' }}>
        {children}
      </div>
    </div>
  );
};
