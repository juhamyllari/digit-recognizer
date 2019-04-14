import React, { useState } from 'react';
import DrawingCanvas from './components/DrawingCanvas'
import Results from './components/Results'

const App = () => {
  const [probabilities, setProbabilities] = useState(null)
  return (
    <div className="container">
      <div className="row">
        <DrawingCanvas setProbabilities={setProbabilities} />
        { probabilities && <Results probabilities={probabilities} /> }
      </div>
    </div>
  )
}

export default App;
