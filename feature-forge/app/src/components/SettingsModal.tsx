import React, { useState, useEffect } from 'react';
import { X, Key } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string, model: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-2.5-pro');

  useEffect(() => {
    const savedKey = localStorage.getItem('GEMINI_API_KEY') || '';
    const savedModel = localStorage.getItem('GEMINI_MODEL') || 'gemini-2.5-pro';
    setApiKey(savedKey);
    setModel(savedModel);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('GEMINI_API_KEY', apiKey);
    localStorage.setItem('GEMINI_MODEL', model);
    onSave(apiKey, model);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2rem', position: 'relative', margin: 'auto', background: 'var(--color-bg-base)', border: '1px solid var(--color-border)' }}>
        <button onClick={onClose} className="btn-ghost" style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
          <X size={20} />
        </button>
        
        <h2 className="flex items-center gap-2 mb-4" style={{ marginBottom: '1rem' }}>
          <Key className="text-gradient" size={24} />
          Settings
        </h2>
        
        <div className="flex-col gap-2 mb-6" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="apiKey" style={{ fontWeight: 500 }}>Google Gemini API Key</label>
          <input 
            id="apiKey"
            type="password" 
            placeholder="AIzaSy..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Your key is stored locally in your browser and never sent anywhere except directly to Google's API.
          </p>
        </div>

        <div className="flex-col gap-2 mb-6" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="modelSelect" style={{ fontWeight: 500 }}>AI Model</label>
          <select 
            id="modelSelect"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem', 
              background: '#000000', 
              border: '1px solid var(--color-border)', 
              borderRadius: 'var(--radius-md)', 
              color: 'var(--color-text-main)', 
              fontFamily: 'inherit', 
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            <option value="gemini-2.5-pro">Gemini 2.5 Pro (Recommended)</option>
            <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
            <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
            <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
          </select>
        </div>
        
        <div className="flex justify-end gap-3" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Settings</button>
        </div>
      </div>
    </div>
  );
};
