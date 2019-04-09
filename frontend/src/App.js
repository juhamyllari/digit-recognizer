import React, { useState } from 'react';
import DrawingCanvas from './components/DrawingCanvas'
import Results from './components/Results'

const App = () => {
  const [probabilities, setProbabilities] = useState(null)
  return (
    <div className="container">
      <DrawingCanvas setProbabilities={setProbabilities} />
      { probabilities && <Results probabilities={probabilities} /> }
    </div>
  )
}

export default App;
