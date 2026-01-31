import React, { useState } from 'react';
import { Code2, Zap, Download, CheckCircle2, AlertCircle } from 'lucide-react';

function App() {
    const [sourceCode, setSourceCode] = useState('');
    const [convertedCode, setConvertedCode] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleConvert = async () => {
        if (!sourceCode) return;

        setIsPending(true);
        setStatus(null);

        try {
            const response = await fetch('http://localhost:5000/api/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sourceCode }),
            });

            const data = await response.json();

            if (data.status === 'success') {
                setConvertedCode(data.convertedCode);
                setStatus({ type: 'success', message: data.message });
            } else {
                setStatus({ type: 'error', message: data.message || 'Conversion failed' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Could not connect to backend server' });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>B.L.A.S.T.</h1>
                <p>Deterministic Selenium Java to Playwright TS Converter</p>
            </header>

            <div className="main-grid">
                <div className="card">
                    <h2><Code2 size={24} color="#818cf8" /> Selenium Java (Input)</h2>
                    <textarea
                        placeholder="Paste your Selenium TestNG code here..."
                        value={sourceCode}
                        onChange={(e) => setSourceCode(e.target.value)}
                    />
                </div>

                <div className="card">
                    <h2><Zap size={24} color="#c084fc" /> Playwright TS (Output)</h2>
                    <div className="output-container">
                        {convertedCode || <span style={{ color: '#64748b' }}>Converted code will appear here...</span>}
                    </div>
                </div>

                <button
                    className="convert-btn"
                    onClick={handleConvert}
                    disabled={isPending || !sourceCode}
                >
                    {isPending ? <span className="loader"></span> : <Zap size={20} />}
                    {isPending ? 'Converting...' : 'Convert to Playwright'}
                </button>
            </div>

            {status && (
                <div className="status-bar" style={{
                    backgroundColor: status.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    borderColor: status.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: status.type === 'success' ? '#4ade80' : '#f87171'
                }}>
                    {status.type === 'success' ? <CheckCircle2 size={18} inline /> : <AlertCircle size={18} inline />}
                    {' '}{status.message}
                </div>
            )}
        </div>
    );
}

export default App;
