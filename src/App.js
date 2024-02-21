import React, { useState } from 'react';
import './App.css';

function App() {
  const [fileContent, setFileContent] = useState('');
  const [result, setResult] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setFileContent(event.target.result);
    };

    reader.readAsText(file);
  };

  const corrigirValores = () => {
    const lines = fileContent.split('\n');
    const correctedLines = lines.map((line) => {
      if (line.includes('|0221|')) {
        const parts = line.split('|');
        parts[3] = '1';
        return parts.join('|');
      } else {
        return line;
      }
    });
    setResult(correctedLines.join('\n'));
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'corrigido.txt';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="App">
      <h1>Correção de Valores</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={corrigirValores}>Corrigir Valores</button>
      {result && (
        <button onClick={handleDownload}>Download Resultado</button>
      )}
      <div className="result">
        <h2>Resultado:</h2>
        <textarea readOnly value={result} />
      </div>
    </div>
  );
}

export default App;
