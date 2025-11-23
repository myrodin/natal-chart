import React, { useState } from 'react';
import CategorySelection from './components/CategorySelection';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [step, setStep] = useState('category'); // category, input, result
  const [data, setData] = useState({
    main: '',
    sub: '',
    question: '',
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });

  const handleCategorySelect = (categoryData) => {
    setData(prev => ({ ...prev, ...categoryData }));
    setStep('input');
  };

  const handleInputSubmit = (inputData) => {
    setData(prev => ({ ...prev, ...inputData }));
    setStep('result');
  };

  const handleRetry = () => {
    setStep('category');
    setData({
      main: '',
      sub: '',
      question: '',
      name: '',
      birthDate: '',
      birthTime: '',
      birthPlace: ''
    });
  };

  const handleBackToCategory = () => {
    setStep('category');
  };

  return (
    <div className="app-container">
      <h1>Cosmic Insight</h1>

      {step === 'category' && (
        <CategorySelection onSelect={handleCategorySelect} />
      )}

      {step === 'input' && (
        <InputForm onSubmit={handleInputSubmit} onBack={handleBackToCategory} />
      )}

      {step === 'result' && (
        <ResultDisplay data={data} onRetry={handleRetry} />
      )}
    </div>
  );
}

export default App;
