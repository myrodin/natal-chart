import React, { useEffect, useState } from 'react';
import { analyzeNatalChart } from '../api/gemini';

const ResultDisplay = ({ data, onRetry }) => {
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                setLoading(true);
                setError(null);
                const analysis = await analyzeNatalChart(data);
                setResult(analysis);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalysis();
    }, [data]);

    return (
        <div className="card">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔮</div>
                <h2>분석 결과</h2>
                <p style={{ color: 'var(--color-text-muted)' }}>
                    {data.name}님의 네이탈 차트를 분석했습니다.
                </p>
            </div>

            <div style={{
                background: 'rgba(0,0,0,0.2)',
                padding: '1.5rem',
                borderRadius: '1rem',
                marginBottom: '2rem',
                border: '1px solid var(--color-glass-border)',
                minHeight: '200px'
            }}>
                <h3 style={{ color: 'var(--color-accent)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                    Q. {data.question}
                </h3>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <div className="loading-spinner" style={{ fontSize: '2rem', animation: 'spin 2s infinite linear' }}>✨</div>
                        <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>별들의 메시지를 해석하고 있습니다...</p>
                    </div>
                ) : error ? (
                    <div style={{ color: '#ef4444', textAlign: 'center', padding: '1rem' }}>
                        <p>{error}</p>
                        {error.includes("API Key") && (
                            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>
                                프로젝트 루트의 .env 파일에 VITE_GEMINI_API_KEY를 설정해주세요.
                            </p>
                        )}
                    </div>
                ) : (
                    <div style={{ lineHeight: '1.8', color: 'var(--color-text)', whiteSpace: 'pre-wrap' }}>
                        {result}
                    </div>
                )}

                <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-glass-border)', paddingTop: '1rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    <p>
                        입력하신 정보:<br />
                        - 생년월일: {data.birthDate}<br />
                        - 태어난 시간: {data.birthTime || '모름'}<br />
                        - 태어난 곳: {data.birthPlace}
                    </p>
                </div>
            </div>

            <button className="btn-secondary" onClick={onRetry} style={{ width: '100%' }}>
                다시 하기
            </button>

            <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default ResultDisplay;
