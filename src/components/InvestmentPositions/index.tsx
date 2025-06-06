import React from 'react';
import './styles.css';

interface InvestmentPositionsProps {
    positions: {
        [key: string]: string;
    };
}

export default function InvestmentPositions({ positions }: InvestmentPositionsProps) {
    if (!positions) return null;

    return (
        <div className="investment-positions">
            <h3 className="text-lg font-semibold mb-4">Posição Atual</h3>
            <div className="positions-grid">
                {Object.entries(positions).map(([ticker, value]) => (
                    <div key={ticker} className="position-tag">
                        <span className="ticker">{ticker}</span>
                        <span className="value">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
} 